import React from 'react';
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


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});





const SentMessages = () => {

    const newSentMessages = useSelector(state => state.sentMessages)

    const classes = useStyles();   // custom styles for materialUi component

    // const dispatch = useDispatch()

    const fr = new FileReader();

    const [sentMessagesData, setSentMessagesData] = React.useState(null)

    // event handler for when user uploads a json file 
    const recievedJson = (e) => {
        console.log("hi")
        const files = e.target.files[0]
        fr.readAsText(files)

        console.log(files)
    }


    // fileReader onload function(asynchronus) for when it completes reading the file   
    fr.onload = function (e) {

        let jsonData = (e.target.result)
        let sentMessagesDatas = JSON.parse(jsonData)
        
        sentMessagesDatas.sort(function (a, b) {
            var aa = a.Date.split('/').reverse().join(),
                bb = b.Date.split('/').reverse().join();
            return aa < bb ? -1 : (aa > bb ? 1 : 0);
        });

        setSentMessagesData(sentMessagesDatas)
        
    }





    return (




        <div>
            <h3>Lists of Sent Messages</h3>
            <p>Below mentioned are the lists of messages already sent, if you send a new otp to any user, comeback here to see the updated result without refreshing the page.</p>
            <input type="file" id="selectFiles" onChange={(e) => { recievedJson(e) }} /><br />
            

                 
                
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><h4>First Name</h4></TableCell>
                                    <TableCell align="left"><h4>Last Name</h4></TableCell>
                                    <TableCell align="left"><h4>Time</h4></TableCell>
                                    <TableCell align="left"><h4>OTP</h4></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {newSentMessages.map((row, index) => (
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


            
        </div>


    )



}

export default SentMessages;