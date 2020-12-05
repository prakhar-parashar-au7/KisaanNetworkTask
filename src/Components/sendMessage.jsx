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
        let date = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
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

        let text = `Hi. Your OTP is: ${otp}`
        nexmo.message.sendSms(from, to, text);
        setOtpSent(true)

    }


    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 200 }}><h4>First Name</h4></TableCell>
                            <TableCell align="left"><h4>Last Name</h4></TableCell>
                            <TableCell align="left"><h4>Phone Number</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ width: 200 }}><h4>{users[parsed.index].first_name}</h4></TableCell>
                            <TableCell align="left"><h4>{users[parsed.index].last_name}</h4></TableCell>
                            <TableCell align="left">{users[parsed.index].phone_number}</TableCell>


                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

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
                </div>
            </div>
                :
                <p>The otp has been sent</p>}

        </>
    )
}


export default SendMessage