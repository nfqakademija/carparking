import React from 'react';
import { connect } from "react-redux";
import Background from '../../components/UI/Background/Background';

import * as fake from './fake';

import * as actions from "../../store/actions/index";
import '../../../css/containers/Auth/Auth.scss';

const auth = (props) => {
  return (
    <>
      <Background/>
      <div className='Auth_container bg-white'>
        <div className='Auth_header'>
          LOG IN
        </div>
            <div className='Auth_body shadow'>
              <div className="px-5 my-auto">
                <a className='google btn' onClick={()=>{props.onLogin(1, 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3YjE5MjhmMmY2MzMyOWYyZTkyZjRmMjc4Zjk0ZWUxMDM4YzkyM2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NTc2Njg0NTk0MC1qbWhuNWJmZmI5ZTlsMWNvcWVjbXM0cDd1ZzIzN2xlZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NzY2ODQ1OTQwLWptaG41YmZmYjllOWwxY29xZWNtczRwN3VnMjM3bGVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExMDczNzcwMDU3NzAyOTQwNDkxIiwiZW1haWwiOiJqb2huZG9lZ3Vlc3QwODBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIzNHRldlduLXExUTNlNDlSWU1pMkNRIiwibmFtZSI6IkpvaG4gRG9lIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tSlI5MnZqcjlXZTgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyZUU0cFFUbjJWWU43SUdNQVRYc3R6MVBzdk1IQS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE1NzY2NDQwNDYsImV4cCI6MTU3NjY0NzY0Nn0.1QoU-Mtznb0fciUBVUOO1BgI1es7TeQcTFfeaEAqp1Uy3xbRpuUY6kiP7DPcM1_8aBfdPKe5tLKBGG7ugjk0fXZ5e2yZL8uRvjxE9nMN258ibmOW3OOJPcSoGpxjj7m4wzm-xFNoUT_v3y20lPuc5fcbCMo8Ilfkg9tb6WYWFAK8Wc6MJqz1XJLfSQzppBs337tGvREcLXxlw6q2i71482FeZNBN7CoA1OxTKOF5RBW3Jy-7j_1OCN7QoampMKce9W5eP1sF88wYJlBYulD5FUehHmcUUFtfLk17OsTZeNMxc9RMIzGiLEo6pxVV0TwRWu7Smzgjp-6II0fdlVVdAQ')}}>
                    <b style={{color:'white'}}>Login as User</b>
                </a>
              </div>
              <div className="px-5 my-auto">
                  <a className='google btn' onClick={()=>{props.onLogin(2, "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3YjE5MjhmMmY2MzMyOWYyZTkyZjRmMjc4Zjk0ZWUxMDM4YzkyM2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0NTc2Njg0NTk0MC1qbWhuNWJmZmI5ZTlsMWNvcWVjbXM0cDd1ZzIzN2xlZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ1NzY2ODQ1OTQwLWptaG41YmZmYjllOWwxY29xZWNtczRwN3VnMjM3bGVkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2Njc2NzczMDM1NzU4ODA4MzIxIiwiZW1haWwiOiJjYXJwYXJraW5ndmFyZGVuaXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI3WFVQeEYzNHgxcFdjUXNsenNFaWFnIiwibmFtZSI6ImNhci1wYXJraW5nIHZhcmRlbmlzIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8taUZCTUtDUUg5VzgvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyZlR2NnJrQTRaSjhxYmVZSlNXT25LUlQ2NDR6dy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiY2FyLXBhcmtpbmciLCJmYW1pbHlfbmFtZSI6InZhcmRlbmlzIiwibG9jYWxlIjoibHQiLCJpYXQiOjE1NzY2NDQwOTMsImV4cCI6MTU3NjY0NzY5M30.F8bgNvW_5xFXaMWcU_NMBbTdqrOqDQ66VipZ0RT_XqXQCJLZblLV3dkDOWf1ZiHP5jWg1AzeE6pGyQZI6UhslJpVEYQ0rJoNbcltjcSfVWvt3PbjUpa0Huwia1ya8fAbb5LOM9L7dFEkNCnUYjKfXZiXHPDM8XJ-n9vLSx86JUNJskligTUOYyG7Ob6SMubpQnvaVx0N52WUxTndLuKJoGA4zfJp6WpXCNxX-DI6R8L5wa1mfdR1iNVERK848cVTbLI9OsjQZ-OI1t_W3S31GMBbGAhk6aG-3cbIN2zI4umOdkvnGhgJmllZhrv2I7qsb2T_r6RgRcVgr2vR5PHJwQ")}}>
                      <b style={{color:'white'}}>Login as Guest</b>
                  </a>
              </div>
            </div>
        </div>
    </>
)}

const mapDispatchToProps = dispatch => {
    return {
      onLogin: (id, token) => dispatch(actions.login(id, token))
    }
  }

export default connect(null, mapDispatchToProps)(auth);