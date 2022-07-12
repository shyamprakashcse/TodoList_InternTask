

import React, { useState,useRef } from "react";
import {Button} from "primereact/button"
import {InputText} from "primereact/inputtext"
import { Toast } from 'primereact/toast'; 
import { Messages } from 'primereact/messages';
 




 
import "./InputFeeder.css"


function InputFeeder(){ 
    
    
    let [userInput,setUserInput] = useState("") 
    let [ItemList,setItemList] = useState([])
    let [favorList,setFavorList] = useState([])
    let [showFav,setShowFav] = useState(false)
    const toast = useRef(null)
    const msgs1 = useRef(null);
    
    const userInputHandler = (evt)=>{
        userInput = evt.target.value
        
        setUserInput(userInput); 
    }
    const Add = ()=>{
        

        if(userInput.trim().length>0){ 

            let userobj = {
               "id":uid(), 
                "item":userInput, 
                "favorites":false 
            }
            ItemList = [...ItemList,userobj]
            setItemList(ItemList)
            setUserInput("");
            showSuccess(); 
            msgs1.current.show({severity: 'success', summary: 'Items Added', detail: 'Item Added into Todo'});
        }
        else{
            console.log("cant add empty"); 
            msgs1.current.show([{ severity: 'error', summary: 'Error', detail: 'Cannot Add Empty String', sticky: true }])
        }
        
        
       

    }

    const addFavorite = (ind)=>{
      let favItem = ItemList[ind] 
      setFavorList([...favorList,favItem]); 
      ItemList[ind].favorites = true ;  
      msgs1.current.show({severity: 'success', summary: 'Favorites: ', detail: 'Item Added into Favorites'});
    //   msgs1.current.show([{ severity: 'error', summary: 'Error', detail: 'Cannot Add Empty String', sticky: true }])



    }

    const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    const removeFavorite = (id,ind)=>{
        
        ItemList[ind].favorites=false; 

        let RemFav=favorList.filter((item)=>{
            return item.id!==id 
        }); 

        setFavorList([...RemFav]) 
        msgs1.current.show([{ severity: 'error', summary: 'Error : ', detail: 'Item remove From Favorites', sticky: false }])



    }
    
    const removeFromFavor = (id,ind)=>{
        let RemFav=favorList.filter((item)=>{
            return item.id!==id 
        }); 
        
        
        ItemList.map((item,ind)=>{
            if(item.id===id){
                ItemList[ind].favorites = false; 
                
                

                 
            }
            
            
    })
      msgs1.current.show([{ severity: 'error', summary: 'Error : ', detail: 'Item remove From Favorites', sticky: false }])


        setFavorList([...RemFav]); 

    }

    const deleteFavour = (id)=>{
        let RemFav=favorList.filter((item)=>{
            return item.id!==id 
        });  

        setFavorList([...RemFav]) 
    }
    
    

    const deleteItem = (id)=>{ 

       let itemid = ItemList[id].id  
       ItemList.splice(id,1); 
       deleteFavour(itemid);  
       setItemList([...ItemList]) ; 

        
    }

    const handleShowFav = ()=>{
        setShowFav(!showFav)
    }

    const showSuccess = ()=> {
        toast.current.show({severity: 'success', summary: 'Item Added', detail: 'Item Added Successfully'});
    }

   
   

    return (
        <div className="row">
            
            <div className="col-sm-6 offset-md-2 inp   ">
                <div className="p-inputgroup">
                    <Button label="ADD" onClick={Add}/>
                    <InputText placeholder="Add your Item into the list" value={userInput} onChange={userInputHandler} />
                    {
                        showFav === true ? <Button label="Show Todo Item" onClick={handleShowFav} className="navbtn"/> : <Button label="Show Favorites Item" className="navbtn" onClick={handleShowFav}/>
                    }
                </div>   

                <Toast ref={toast}></Toast>
                <Messages ref={msgs1} />
                

            </div> 
           
           
           { showFav===false? <div className="col-sm-6 offset-md-2 bg-bg-white  list card-header container-md"> 
            
           <h3 className="card-header text-md-center listhead">Todo List</h3>
           

             {
               ItemList.length===0 ? <h3 className="card-body"> No Item found in the list </h3> : ItemList.length!==0 &&   ItemList.map((item,ind)=>{
                    return <div className="item card-footer" itemID={item.id} key={item.id}>
                             <h2 className="text-warning ">{item.item}</h2> 
                             <button className="btn btn-danger" id={item.id} onClick={()=>{deleteItem(ind)}}>Delete</button> 

                            {item.favorites===false? <button className="btn btn-warning" id={item.id} onClick={()=>{addFavorite(ind)}}>Add Favorites</button>:
                             <button className="btn btn-dark" id={item.id} onClick={()=>{removeFavorite(item.id,ind)}} >Remove from Favorites</button>}

                          </div>
                })
             }
        
           </div>:null 
             } 

           


             { showFav===true? <div className="col-sm-6 offset-md-2 bg-bg-white  list card-header container-md"> 
            
            <h3 className="card-header text-md-center listhead">Favorites Item List</h3>
            
 
              {
                favorList.length===0 ? <h3 className="card-body"> No Item found in the list </h3> : favorList.length!==0 &&   favorList.map((item,ind)=>{
                     return <div className="item card-footer" itemID={item.id} key={item.id}>
                              <h2 className="text-warning ">{item.item}</h2> 
                             
                             
                        <button className="btn btn-dark" id={item.id} onClick={()=>{removeFromFavor(item.id,ind)}} >Remove from Favorites</button>
 
                           </div>
                 })
              }
         
            </div> : null 
              } 
            

            
            
            
            
           
                    
        </div>
    );
}

export default InputFeeder ; 
