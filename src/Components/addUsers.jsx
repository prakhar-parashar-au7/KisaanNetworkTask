import React from 'react';
import { useDispatch } from 'react-redux'
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





const Adduser = () => {

    const classes = useStyles();   // custom styles for materialUi component

    const dispatch = useDispatch()

    const fr = new FileReader();

    const [userData, setUserData] = React.useState(null)
    const [currentlySelectedUserIndex, setCurrentlySelectedUserIndex] = React.useState(null)

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
        let userData = JSON.parse(jsonData)
        setUserData(userData)
        dispatch(recievedUsersInfo(userData))
    }


    const userSelected = (index) => {
        setCurrentlySelectedUserIndex(index)
    }




    return (


        

            <div>
                <h3>Lists of contacts</h3>
                <p>Upload the dummy json file with contacts to list all the contacts below</p>
                <input type="file" id="selectFiles" onChange={(e) => { recievedJson(e) }} /><br />
                {
                    (userData == null)
                        ?
                        null
                        :
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 200 }}><h4>First Name</h4></TableCell>
                                        <TableCell align="left"><h4>Last Name</h4></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData.map((row, index) => (
                                        <TableRow key={row.name}>
                                            <TableCell style={{ width: 200 }}>
                                                <Link to={`/userInfo?index=${index}`}><Button onClick={() => userSelected(index)}>{row.first_name}</Button></Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link to={`/userInfo?index=${index}`}><Button onClick={() => userSelected(index)}>{row.last_name}</Button></Link></TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>


                }
            </div>
          

    )



}

export default Adduser;