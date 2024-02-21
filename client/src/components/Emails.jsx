import { useEffect,useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { API_URLS } from "../services/api.urls";
import useApi from '../hooks/useApi'
import { Checkbox ,Box,ListItem,List} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./common/NoMails";

import { EMPTY_TABS } from "../constants/constant";
const Emails =() =>{
    const [selectedEmails , setSelectedEmails] =useState([]);
    const [refereshScreen ,setRefreshScreen]=useState(false);
    const {openDrawer} =useOutletContext();

    const {type} = useParams();

    const getEmailSevice = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin)
    const deleteEmailService=useApi(API_URLS.deleteEmail)
    
    useEffect(()=>{
           getEmailSevice.call({},type);
    },[type,refereshScreen])

const selectAllEmails =(e)=>{
    if(e.target.checked){
       const emails = getEmailSevice?.response?.map(email => email._id);
       setSelectedEmails(emails);

    }else{
             setSelectedEmails([]);
    }
}
const deleteSelectedEmails =(e)=>{
   if(type==='bin') {
          deleteEmailService.call(selectedEmails)
   }else{
    moveEmailsToBinService.call(selectedEmails);
   }
   setRefreshScreen(prevState => !prevState);
}

    return(
        <Box style={openDrawer ? {marginLeft:250,width:'calc(100% - 250px)' }:{width:'100%'}}>
            <Box style={{padding:'20px 10px 0 10px',display:'flex',alignItems:'center'}}> 
               <Checkbox size="small" onChange={(e)=>selectAllEmails(e)}/>
               <DeleteOutline onClick={(e)=>deleteSelectedEmails(e)}/>
            </Box>
           <List>
              {
                getEmailSevice?.response?.map(email =>(
                <Email
                     key={email._id}
                     email={email}
                     selectedEmails={selectedEmails}
                     setRefreshScreen={setRefreshScreen}
                     setSelectedEmails={setSelectedEmails}
                />
                )) 
              }
           </List>
           {
            getEmailSevice?.response?.length === 0 &&
            <NoMails message={EMPTY_TABS[type]}/>

           }
         </Box>
    )
}

export default Emails;