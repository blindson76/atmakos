import React, {createContext, useContext, useState, useEffect} from 'react';
import {useAuth} from './Auth'

export const TalepProvider = ({children}) => {
  const {user} = useAuth()

  const talepEkle = async newTalep => {
    return await user.mongoClient("mongodb-atlas").db("atmakos").collection("talep").insertOne({
      userid:user.id,
      ...newTalep
    })
  }
  const talepSil = async talep => {

  }
  const talepListele = async () => {
    console.log(user.id)
    return user.id
  }
  const talepGuncelle = async newTalep => {

  }

  return (
    <Context.Provider value={{talepEkle, talepSil, talepGuncelle, talepListele}}>{children}</Context.Provider>
  );
};

const Context = createContext();
export const useTalep = () => {
    return useContext(Context)
}