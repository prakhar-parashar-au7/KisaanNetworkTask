import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import axios from 'axios'
import Spinner from '@material-ui/core/CircularProgress'



// custom styles for material ui components

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    headingRow: {
        backgroundColor: "#3f51b5",

    }
});



// Main Component

const Adduser = () => {

    // using all the dependencies, initializing hooks 

    const classes = useStyles();

    const dispatch = useDispatch()

    const fr = new FileReader();

    const usersData = useSelector(state => state.users)


    // states used in the component 

    const [userData, setUserData] = React.useState(null)
    const [currentlySelectedUserIndex, setCurrentlySelectedUserIndex] = React.useState(null)
    const [addUser, setAddUser] = React.useState(false)
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPhoneNo, setNewPhoneNo] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone_number, setPhoneNo] = useState("")
    const [currentlyEditingIndex, setCurrentlyEditingIndex] = useState(-1)
    const [spinner, setSpinner] = useState(false)


    useEffect(() => {
        setUserData(usersData)
    }, [])





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
        console.log(userData)
        setUserData(userData)
        sendUser(userData)
        dispatch(recievedUsersInfo(userData))
    }






    // functions to handle onchange events when new user is being added

    const newFirstNameChange = (e) => {
        setNewFirstName(e.target.value)
    }

    const newLastNameChange = (e) => {
        setNewLastName(e.target.value)
    }


    const newPhoneNoChange = (e) => {
        setNewPhoneNo(e.target.value)

    }


    // to create an object with correct fields from user inputs 

    const createData = (newFirstName, newLastName, newPhoneNo) => {
        return { first_name: newFirstName, last_name: newLastName, phone_number: newPhoneNo };
    }


    // to add a new user when clicked on save button 

    const saveNewUser = () => {
        const newUser = createData(newFirstName, newLastName, newPhoneNo)
        setNewFirstName("")
        setNewLastName("")
        setNewPhoneNo("")
        setAddUser(false)
        setUserData([newUser, ...usersData])
        sendUser([newUser, ...usersData])
        dispatch(recievedUsersInfo([newUser, ...usersData]))
    }


    // functions to handle on change events when user is editing a row
    const firstNameChange = (e) => {
        setFirstName(e.target.value)
        console.log(e.target.value)
    }

    const lastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const PhoneNoChange = (e) => {
        setPhoneNo(e.target.value)
    }


    //  function to change states based on the row that user is currently editing, so as to show textfields for user to edit values in
    const currentlyEditing = (index) => {
        setCurrentlyEditingIndex(index)
        setFirstName(usersData[index].first_name)
        setLastName(usersData[index].last_name)
        setPhoneNo(usersData[index].phone_number)
    }


    // saving edited values     

    const saveEditedUser = (index) => {
        const newUsersData = usersData
        newUsersData[index] = createData(first_name, last_name, phone_number)
        // setUserData(newUsersData)
        sendUser(newUsersData)
        dispatch(recievedUsersInfo(newUsersData))

        setFirstName("")
        setLastName("")
        setPhoneNo("")
        setCurrentlyEditingIndex(-1)

    }


    // deleting a row based on index taken from user when he clicks the button delete in a particular row     

    const deleteThis = (index) => {
        console.log("hi")
        const newUsersData = usersData
        newUsersData.splice(index, 1)
        setUserData([...newUsersData])
        sendUser(newUsersData)
        dispatch(recievedUsersInfo(newUsersData))

    }

    // axios request to backend server to get the users data already stored in the database 

    useEffect(() => {
        setSpinner(true)
        axios({
            method: "get",
            url: "https://boiling-reaches-91818.herokuapp.com/getUsers"
        }).then((res) => {
            console.log(res)
            setUserData(res.data[0].users)
            dispatch(recievedUsersInfo(res.data[0].users))
            setSpinner(false)
        })



    }, [])


    // utility function to send requests to backend servers 

    const sendUser = (users) => {
        axios({
            method: "post",
            url: "https://boiling-reaches-91818.herokuapp.com/saveUsers",
            data: {
                users: users
            }
        })

    }


    return (




        <div>
            {/*  top most div to show buttons to add users and uploading json files  */}

            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", marginBottom: "30px", marginLeft: "140px" }}>
                <div>
                    <Button color="primary" variant="contained" onClick={() => { setAddUser(true) }}>Add new user</Button>
                </div>
                <h3>or</h3>
                <label class="custom-file-upload" for="selectFiles">
                    Upload a JSON file
            <input type="file" id="selectFiles" onChange={(e) => { recievedJson(e) }} />
                    {/* <Button color="primary" variant="contained">Upload a JSON file</Button> */}

                </label>
            </div>


            {/* Material Ui table to show users data */}
            {
                (spinner) ? <div style={{marginLeft : "500px", marginTop : "150px"}}><Spinner/></div>
             : 
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headingRow}>
                            <TableCell><div style={{ textAlign: "center", color: "white" }}>
                                <h3>ID</h3></div></TableCell>

                            <TableCell ><div style={{ textAlign: "center", color: "white" }}>
                                <h3>First Name</h3></div></TableCell>
                            <TableCell ><div style={{ textAlign: "center", color: "white" }}>
                                <h3>Last Name</h3></div></TableCell>
                            <TableCell ><div style={{ textAlign: "center", color: "white" }}>
                                <h3>Phone Number</h3></div></TableCell>
                            <TableCell ></TableCell>
                            <TableCell ></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (addUser) ?

                                // conditionally rendering empty textfields if user has clicked on add new user button

                                <TableRow>
                                    <TableCell component="th" scope="row">

                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <TextField
                                            id="outlined-textarea"
                                            label="First Name"
                                            placeholder=""
                                            variant="outlined"
                                            onChange={newFirstNameChange}
                                            value={newFirstName}

                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Last Name"
                                            placeholder=""
                                            variant="outlined"
                                            onChange={newLastNameChange}
                                            value={newLastName}

                                        />
                                    </TableCell>
                                    <TableCell >
                                        <TextField
                                            id="outlined-textarea"
                                            label="Phone Number"
                                            placeholder=""
                                            onChange={newPhoneNoChange}
                                            variant="outlined"
                                            value={newPhoneNo}

                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={saveNewUser}>Save</Button>
                                    </TableCell>
                                </TableRow>

                                : null}

                        {/* user data  */}
                        {usersData.map((row, index) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <div style={{ marginLeft: "10px" }}>
                                        <h3>{index + 1}</h3>
                                    </div>



                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {
                                        (currentlyEditingIndex == index) ?

                                            // conditionally rendering textfield with default values as previous values if user is trying to edit a particular field 
                                            <TextField
                                                id="outlined-textarea"
                                                label="First Name"
                                                placeholder=""
                                                variant="outlined"
                                                onChange={firstNameChange}
                                                defaultValue={userData[index].first_name}


                                            />
                                            :
                                            <>


                                                <PopupState variant="popover" popupId="demo-popup-popover">
                                                    {(popupState) => (
                                                        <div>

                                                            <div className="name" {...bindTrigger(popupState)}>

                                                                {row.first_name}

                                                            </div>


                                                            {/* Popover to display user information and send message button when user clicks on a particular name */}

                                                            <Popover
                                                                {...bindPopover(popupState)}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'center',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'center',
                                                                }}
                                                            >

                                                                <div id="dailog">
                                                                    {row.first_name} {row.last_name}
                                                                    <br></br>
                                                                    <br></br>
                                                                    {row.phone_number}
                                                                    <br></br>
                                                                    <br></br>
                                                                    <Link to={`sendMessage?index=${index}`} style={{ textDecoration: "none" }}><Button color="primary" variant="contained"> Send Otp</Button></Link>
                                                                </div>

                                                            </Popover>
                                                        </div>
                                                    )}
                                                </PopupState>





                                            </>
                                    }
                                </TableCell>
                                <TableCell >
                                    {
                                        (currentlyEditingIndex == index) ?
                                            <TextField
                                                id="outlined-textarea"
                                                label="Last Name"
                                                placeholder=""
                                                variant="outlined"
                                                onChange={lastNameChange}
                                                defaultValue={userData[index].last_name}
                                            />
                                            :
                                            <>

                                                <PopupState variant="popover" popupId="demo-popup-popover">
                                                    {(popupState) => (
                                                        <div>

                                                            <div className="name" {...bindTrigger(popupState)}>

                                                                {row.last_name}

                                                            </div>
                                                            {/* </Button> */}
                                                            <Popover
                                                                {...bindPopover(popupState)}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'center',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'center',
                                                                }}
                                                            >

                                                                <div id="dailog">
                                                                    {row.first_name} {row.last_name}
                                                                    <br></br>
                                                                    <br></br>
                                                                    {row.phone_number}
                                                                    <br></br>
                                                                    <br></br>
                                                                    <Link to={`sendMessage?index=${index}`} style={{ textDecoration: "none" }}><Button color="primary" variant="contained"> Send Otp</Button></Link>
                                                                </div>

                                                            </Popover>
                                                        </div>
                                                    )}
                                                </PopupState>
                                            </>}
                                </TableCell>
                                <TableCell >

                                    {
                                        (currentlyEditingIndex == index) ?
                                            <TextField
                                                id="outlined-textarea"
                                                label="Phone No"
                                                placeholder=""
                                                variant="outlined"
                                                onChange={PhoneNoChange}
                                                defaultValue={userData[index].phone_number}
                                            />
                                            :
                                            <>

                                                <div className="number">
                                                    {row.phone_number}
                                                </div>
                                            </>}


                                </TableCell>
                                <TableCell align="right">
                                    {
                                        (currentlyEditingIndex == index) ?
                                            <Button variant="contained" color="primary" onClick={() => { saveEditedUser(index) }}>Save</Button>
                                            :
                                            <>

                                                <Button variant="contained" color="primary" onClick={() => { currentlyEditing(index) }}>Edit</Button>

                                            </>}




                                </TableCell>

                                <TableCell align="right">
                                    {
                                        (currentlyEditingIndex == index) ?
                                            null
                                            :


                                            <Button variant="contained" color="primary" onClick={() => { deleteThis(index) }}>Delete</Button>
                                    }</TableCell>
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