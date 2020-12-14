import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom'
import Nexmo from 'nexmo'
import { sentMessagesAction } from './../Redux/Actions'
import './Homestyles.css'
import axios from 'axios'

const nexmo = new Nexmo({
    apiKey: "13e900bd",
    apiSecret: "mPdutaFAgG9IkjbL"
})

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const SendMessage = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const users = useSelector(state => state.users)

    const [otpSent, setOtpSent] = React.useState(false)

    // generating Otp
    var minm = 10000;
    var maxm = 99999;
    let otp = Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;



    var parsed = queryString.parse(props.location.search)
    console.log(otp)
    const from = 'Vonage APIs';
    const to = users[parsed.index].phone_number;





    const sendOtp = () => {


        // let text = `Hi. Your OTP is: ${otp}`

        // const sendData = JSON.stringify({
        //     to: users[parsed.index].phone_number,
        //     body: `Hi. Your OTP is: ${otp}`
        // })
        console.log("react")
        axios({
            method: "post",
            url: "https://boiling-reaches-91818.herokuapp.com/api/messages",
            data: {
                to: users[parsed.index].phone_number,
                body: `Hi, ${users[parsed.index].first_name}.Your OTP from Prakhar is : ${otp}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.data.success) {
                    let date = new Date();
                    var dd = date.getDate();
                    var mm = date.getMonth() + 1;
                    var yyyy = date.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var today = dd + '/' + mm + '/' + yyyy;
                    let thisText = {
                        first_name: users[parsed.index].first_name,
                        last_name: users[parsed.index].last_name,
                        Date: today,
                        OTP: otp
                    }


                    dispatch(sentMessagesAction(thisText))
                    axios({
                        method : "post",
                        url: "https://boiling-reaches-91818.herokuapp.com/messageSent",
                        data : {
                            messages : thisText
                        }
                    })
                    setOtpSent(true)

                }
            })


        


    }


    return (
        <>
            <div id="sendMessage">


                Sending this message to &nbsp; &nbsp; <div style={{ color: "#F78888" }}>{users[parsed.index].first_name} &nbsp;{users[parsed.index].last_name}</div>&nbsp;&nbsp; at &nbsp;&nbsp;<div style={{ color: "#F78888" }}>{users[parsed.index].phone_number}</div>
            </div>
            <br></br><br></br><br></br>

            {(otpSent == false) ? <div style={{ textAlign: 'center' }}>
                <TextField
                    id="outlined-multiline-static"
                    label="Message"
                    multiline
                    rows={4}
                    defaultValue={`Hi. Your OTP is: ${otp}`}
                    variant="outlined"
                />
                <div style={{ textAlign: 'center', marginTop: "40px" }}>
                    <Button color="primary" variant="contained" onClick={sendOtp}> Send Otp</Button>
                    <br></br><br></br>
                    <Link to="/" style={{ textDecoration: "none" }}><Button color="primary" variant="contained">Go Home</Button></Link>
                </div>
            </div>
                :
                <div style={{ marginLeft: "600px" }}>
                    <img src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png" height="50px" width="50px"></img>
                    <p>The otp has been sent</p>
                    <Link to="/" style={{ textDecoration: "none" }}><Button color="primary" variant="contained">Go Home</Button></Link>
                </div>
            }

        </>
    )
}


export default SendMessage