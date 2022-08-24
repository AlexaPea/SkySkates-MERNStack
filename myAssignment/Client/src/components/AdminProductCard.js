import React from 'react';
import shoeOne from "../Assets/Products/ShoeOne.jpg";
import cart from "../Assets/Images/Cart.png";
import { UilTrashAlt } from '@iconscout/react-unicons';
import Axios from 'axios';
import UpdateForm from './UpdateForm';
import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';


const AdminProductCard = (props) => {

//==================================================
//delete product
    //delete function
    const deleteProduct = () => {
        // console.log(props.userId);
    
        if(window.confirm("Are you sure you want to delete: " + props.productName) === true){
          //console.log("deleted item");
    
          Axios.delete('http://localhost:5000/api/deleteproduct/' + props.productId)
          .then((res) => {
            if(res){
              console.log("Deleted: " + props.productName);
              props.editRender(true);
            }
          
          })
          .catch(function (error) { console.log(error)});  
        }
      }


//==================================================================
  //edit functionality

    // Handle Modal
    const [editModal, setEditModal] = useState();


  const editProduct = (event) => {
    event.preventDefault();
    console.log("click");
    setEditModal(<UpdateForm
      close={setEditModal}
      productId = {props.productId}
      productName = {props.productName}
      productPrice = {props.productPrice}
      productCollection = {props.productCollection}
      productDescription = {props.productDescription}
      productRating = {props.productRating}
      veganFriendly = {props.veganFriendly}
      // Five-One = {props.valOne}
    />)

    // setEditModal(<AddProduct rerender={setEditModal}/>)
  } 






    return (
        <> 
         {editModal}
        <div className='adminCard'>
        
            <div className='productCard'>
                    {/* <div className='hoverOption'>
                        
                        <div className='buy'>
                            <img src={cart} className="cart"/>
                        </div>
                    </div> */}
                    <UilTrashAlt className="bin" onClick={deleteProduct}/>
                    <div className='productImg'>
                        <img src={shoeOne} className="cardShoe"/>
                    </div>
                    <div className='shoeName'>
                        <h4>{props.productName}</h4>
                    </div>
                    <div className='shoeStock'>
                        <h6>Available Stock: {props.valOne}</h6>
                    </div>
                    <div className='shoePrice'>
                        <h6>R {props.productPrice}</h6>
                    </div>

                    <button className='primary-btn' onClick={editProduct}>Edit</button>
                </div>
            
                
        </div>

       
        </>
    );
};

export default AdminProductCard;