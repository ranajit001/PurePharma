import React from 'react'
import CategoryGrid from './CategoryGrid/CategoryGrid'
import Header from './Header/Header'
import Navbar from './Navbar/navbar'
import AutoCarousal from './carousal/AutoCarousal'
import ProductList from './products/ProductList'
import Footer from './Footer/Footer'
import Carousel from './carousal/Carousal'
import Chatbot from './chatbot/chatbot'
import ProductList2 from './products/ProductList2'
import PetMedicineChatbot from '../specialties/ChatBot'

function Mainpage() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <CategoryGrid/>
      <AutoCarousal/>
      <ProductList/>
      <Carousel/>
      <ProductList2/>
      <Chatbot/>
      {/* <PetMedicineChatbot/> */}
      <Footer/>
    </div>
  )
}

export default Mainpage
