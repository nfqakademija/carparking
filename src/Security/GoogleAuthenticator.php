<?php

namespace App\Security;

use App\Entity\Roles;
use App\Entity\Users;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Client\OAuth2ClientInterface;
use KnpU\OAuth2ClientBundle\Security\Authenticator\SocialAuthenticator;
use League\OAuth2\Client\Provider\GoogleUser;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class GoogleAuthenticator extends SocialAuthenticator
{
    private $clientRegistry;
    private $em;
    private $router;
    private $testCred;

    public function __construct(ClientRegistry $clientRegistry, EntityManagerInterface $em, RouterInterface $router)
    {
        $this->clientRegistry = $clientRegistry;
        $this->em = $em;
        $this->router = $router;
    }

    public function supports(Request $request)
    {
        return $request->getPathInfo() == '/connect/google/check' && $request->isMethod('GET');
    }

    public function getCredentials(Request $request)
    {
        return $this->fetchAccessToken($this->getGoogleClient());
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        $this->testCred = $credentials;
        /** @var GoogleUser $googleUser */
        $googleUser = $this->getGoogleClient()
            ->fetchUserFromToken($credentials);

        $email = $googleUser->getEmail();

        $user = $this->em->getRepository(Users::class)
            ->findOneBy(['email' => $email]);

        if (!$user) {
            $roleName = 'guest';
            $role = $user = $this->em->getRepository(Roles::class)
                ->findOneBy(['role' => $roleName]);
            $user = new Users();
            $user->setEmail($googleUser->getEmail());
            $user->setName($googleUser->getFirstName());
            $user->setSurname($googleUser->getLastName());
            $user->setUserRole($role);
            $this->em->persist($user);
            $this->em->flush();
        }

        return $user;
    }

    /**
     * @return OAuth2ClientInterface
     */
    private function getGoogleClient()
    {
        return $this->clientRegistry
            ->getClient('google');
    }

    /**
     * @param Request $request The request that resulted in an AuthenticationException
     * @param AuthenticationException $authException
     * The exception that started the authentication process
     *
     * @return Response
     */
    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new RedirectResponse('/');
    }

    /**
     * @param Request $request
     * @param AuthenticationException $exception
     *
     * @return Response
     */
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        // TODO: Implement onAuthenticationFailure() method.
        $message = strtr($exception->getMessageKey(), $exception->getMessageData());
        return new Response($message, Response::HTTP_FORBIDDEN);
    }

    /**
     * @param Request $request
     * @param TokenInterface $token
     * @param string $providerKey The provider (i.e. firewall) key
     *
     * @return RedirectResponse
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        $valueArray = $this->testCred->getValues();
        $key = $valueArray['token_type'];
        $value = $valueArray['id_token'];
        $userEmail = $this->tokenParser($value);
        $userId = $this->getUserFromEmail($userEmail);

        setcookie($key, $value, time() + (86400 * 30), "/");
        setcookie('userId', $userId, time() + (86400 * 30), "/");

        $response = new RedirectResponse('/app');
        $response->headers->setCookie(Cookie::create($key . '-token', $value, 0, '/', '127.0.0.1', false, false));
        $response->headers->setCookie(Cookie::create('userId', $userId, 0, '/', '127.0.0.1', false, false));
        return $response;
    }

    private function tokenParser($token)
    {
        $tokenParts = explode(".", $token);
        $tokenHeader = base64_decode($tokenParts[0]);
        $tokenPayload = base64_decode($tokenParts[1]);
        $jwtHeader = json_decode($tokenHeader);
        $jwtPayload = json_decode($tokenPayload);
        return $jwtPayload->email;
    }

    private function getUserFromEmail($email)
    {
        $user = $this->em->getRepository(Users::class)->findUserByEmail($email);
        return $user->getId();
    }
}
