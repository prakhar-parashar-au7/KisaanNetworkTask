import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { recievedUsersInfo } from './../Redux/Actions'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from '@material-ui/core/CircularProgress'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});





const SentMessages = () => {



    const classes = useStyles();   // custom styles for materialUi component

    // states used 

    const [sentMessagesData, setSentMessagesData] = React.useState(null)
    const [newSentMessages, setNewSentMessages] = React.useState(null)
    const [spinner, setSpinner] = React.useState(false)





    // get request to backend to recieve sent messages 


    useEffect(() => {
        setSpinner(true)
        axios({
            method: "get",
            url: "https://boiling-reaches-91818.herokuapp.com/getMessages",
        }).then((res) => {
            setNewSentMessages(res.data[0].messages.reverse())
            setSpinner(false)
        })
    }, [])




    return (




        <div>
            <h3>Lists of Sent Messages</h3>


         {
                (spinner) ? <div style={{ marginLeft: "500px", marginTop: "150px" }}><Spinner /></div>
                : 

         

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h4>First Name</h4></TableCell>
                            <TableCell align="left"><h4>Last Name</h4></TableCell>
                            <TableCell align="left"><h4>Date</h4></TableCell>
                            <TableCell align="left"><h4>OTP</h4></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {newSentMessages && newSentMessages.map((row, index) => (
                            <TableRow>
                                <TableCell >
                                    {row.first_name}
                                </TableCell>
                                <TableCell align="left">
                                    {row.last_name}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Date}
                                </TableCell>
                                <TableCell align="left">
                                    {row.OTP}
                                </TableCell>

                            </TableRow>
                        ))}
                        {
                            (sentMessagesData == null)
                                ?
                                null
                                :





                                sentMessagesData.map((row, index) => (
                                    <TableRow>
                                        <TableCell >
                                            {row.first_name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.last_name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.Date}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.OTP}
                                        </TableCell>

                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
}



        </div>


    )



}

export default SentMessages;