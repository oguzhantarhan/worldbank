"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { CollectionType } from "@/types/Services/CollectionsServiceTypes";
import { toast } from "react-toastify";
import { AddCollection, EditCollection } from "@/Services/CollectionServices";
import { DataErrorType } from "@/types/types";

const AddEditCollectionDialog = ({
  open,
  setOpen,
  collectionData,
  setCollectionList
}: {
  open: boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
  collectionData?: CollectionType
  setCollectionList:React.Dispatch<React.SetStateAction<DataErrorType<CollectionType[]>>>
}) => {
  const [collectionName, setCollectionName] = useState<string>(
    collectionData?.collectionName || ""
  );
  const [collectionDescription, setCollectionDescription] = useState<string>(
    collectionData?.collectionDescription || ""
  );
  const [newCardCount, setNewCardCount] = useState<number>(
    collectionData?.newCardCount || 20
  );

  useEffect(() => {
    if (open && collectionData) {
      setCollectionName( collectionData.collectionName)
      setCollectionDescription(collectionData?.collectionDescription)
      setNewCardCount( collectionData.newCardCount)
    }
  
   
  }, [open])
  
const onClose=()=>{
setCollectionName("")
setCollectionDescription("")
setNewCardCount(20)
setOpen(false)
}

  const handleSubmit = async () => {
    if (collectionData) {
   
      const res = await EditCollection({
     
        id:collectionData.id,
          collectionName,
          collectionDescription,
          newCardCount
      }
   
      );
      if (!res.error) {
        toast.success("Deste Güncellendi");
        const updatedCollection=res.data as CollectionType
        setCollectionList((prev) => ({
          ...prev,
          data: prev.data.map((item) =>
            item.id === updatedCollection.id ? { ...item, ...res.data } : item
          ),
        }));
      } else toast.error(res.errorMessage);
    } else {
      // Yeni koleksiyon ekleme
      const res = await AddCollection({
        collectionName,
        collectionDescription,
        newCardCount
      });
      if (!res.error) {
        toast.success("Deste Eklendi");
        setCollectionList((prev)=>(
          {...prev,data:[...prev.data,res.data as CollectionType]}
        ))
      } else toast.error(res.errorMessage);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{collectionData ? "Koleksiyonu Düzenle" : "Yeni Koleksiyon Ekle"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Deste Adı"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deste Açıklaması"
              value={collectionDescription}
              onChange={(e) => setCollectionDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Yeni Kart Sayısı"
              value={newCardCount}
              type="number"
              onChange={(e) => setCollectionName(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} color="primary">
          {collectionData ? "Güncelle" : "Ekle"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCollectionDialog;
