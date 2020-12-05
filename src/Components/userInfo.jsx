import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import queryString from 'query-string'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



const UserInfo = (props) => {
    
    const classes = useStyles(); 

    var parsed = queryString.parse(props.location.search)
    
  
    const users = useSelector(state => state.users)
    
    
    
    return(
           
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
                        <TableCell align="left"><Link to={`sendMessage?index=${parsed.index}`}><Button color="primary" variant="contained">Send Message</Button></Link></TableCell>

                    </TableRow>
                    
                  </TableBody>
                </Table>
            </TableContainer>

        

    )
}

export default UserInfo