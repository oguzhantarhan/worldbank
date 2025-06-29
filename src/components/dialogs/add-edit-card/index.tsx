"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { CardRelationType } from "@/types/Services/CardServiceTypes"; // Your type imports
import { GetUserCollection } from "@/Services/CollectionServices";
import { CollectionType } from "@/types/Services/CollectionsServiceTypes";
import { AddCard, EditCard } from "@/Services/CardServices";
import { toast } from "react-toastify";
import { DataErrorType } from "@/types/types";

const AddEditCardDialog = ({
  open,
  cardData,
  setOpen,
  setcardList
}: {
  open: boolean;
  cardData?: CardRelationType;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  setcardList:React.Dispatch<React.SetStateAction<DataErrorType<CardRelationType[]>>>;
}) => {
  const [frontTitle, setFrontTitle] = useState<string>("");
  const [backTitle, setBackTitle] = useState<string>("");
  const [wordDescription, setWordDescription] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [collectionId, setCollectionId] = useState<number>(0);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  // States for additional fields
  const [frontTextAudioUrl, setFrontTextAudioUrl] = useState<string>("");
  const [backTextAudioUrl, setBackTextAudioUrl] = useState<string>("");
  const [frontTextImageUrl, setFrontTextImageUrl] = useState<string>("");
  const [backTextImageUrl, setBackTextImageUrl] = useState<string>("");

  useEffect(() => {
    // Fetch collections when the dialog opens
    const getCollections = async () => {
      const collections = await GetUserCollection();
      setCollections(collections.data);
      if (collectionId==0) {
        setCollectionId(collections.data[0].id??0)
      }
    };
    getCollections();

    if (cardData) {
      // Set state values from cardData if available
      setFrontTitle(cardData.card.frontTitle || "");
      setBackTitle(cardData.card.backTitle || "");
      setWordDescription(cardData.card.wordDescription || "");
      setText(cardData.card.text || "");
      setFrontTextAudioUrl(cardData.card.frontTextAudioUrl || "");
      setBackTextAudioUrl(cardData.card.backTextAudioUrl || "");
      setFrontTextImageUrl(cardData.card.frontTextImageUrl || "");
      setBackTextImageUrl(cardData.card.backTextImageUrl || "");
      setIsHidden(cardData.isHidden || false);
      setCollectionId(cardData.cardCollectionId || 0);
    }
  }, [open]); 

  const onClose = () => {
    setOpen(false);


    setFrontTitle("");
    setBackTitle("");
    setWordDescription("");
    setText("");
    setFrontTextAudioUrl("");
    setBackTextAudioUrl("");
    setFrontTextImageUrl("");
    setBackTextImageUrl("");
    setIsHidden(false);
    setCollectionId(0);
  };

  const handleSubmit = async () => {
    if (cardData) {

      const res = await EditCard({
        card: {
          id:cardData!.id,
          frontTitle,
          backTitle,
          wordDescription,
          text,
          frontTextAudioUrl,
          backTextAudioUrl,
          frontTextImageUrl,
          backTextImageUrl,
        },
        cardCollectionId:collectionId,
        cardId: cardData.card.id!,
        isHidden,
        id: cardData.id,
      });
  
      if (!res.error) {
        toast.success("Kart Güncellendi");
        const updatedCard = res.data as CardRelationType;
        setcardList((prev) => ({
          ...prev,
          data: prev.data.map((item) =>
            item.id === updatedCard.id ? { ...item, ...updatedCard } : item
          ),
        }));
      } else toast.error(res.errorMessage);
    } else {

      const res = await AddCard({
        card: {
          frontTitle,
          backTitle,
          wordDescription,
          text,
          frontTextAudioUrl,
          backTextAudioUrl,
          frontTextImageUrl,
          backTextImageUrl,
        },
        cardCollectionId:collectionId,
        isHidden
      });
  
      if (!res.error) {
        toast.success("Kart Eklendi");
        setcardList((prev) => ({
          ...prev,
          data: [...prev.data, res.data as CardRelationType],
        }));
      } else toast.error(res.errorMessage);
    }
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{cardData ? "Kartı Düzenle" : "Yeni Kart Ekle"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} padding={"1rem"}>
          <Grid item xs={12}>
            <TextField
              label="Ön Başlık"
              value={frontTitle}
              onChange={(e) => setFrontTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Arka Başlık"
              value={backTitle}
              onChange={(e) => setBackTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Kelime Açıklaması"
              value={wordDescription}
              onChange={(e) => setWordDescription(e.target.value)}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Metin"
              value={text}
              onChange={(e) => setText(e.target.value)}
              fullWidth
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ön Metin Ses URL"
              value={frontTextAudioUrl}
              onChange={(e) => setFrontTextAudioUrl(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Arka Metin Ses URL"
              value={backTextAudioUrl}
              onChange={(e) => setBackTextAudioUrl(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ön Metin Görsel URL"
              value={frontTextImageUrl}
              onChange={(e) => setFrontTextImageUrl(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Arka Metin Görsel URL"
              value={backTextImageUrl}
              onChange={(e) => setBackTextImageUrl(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Topluluk</InputLabel>
              <Select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value as number)}
              >
                {collections.map((collection) => (
                  <MenuItem key={collection.id} value={collection.id}>
                    {collection.collectionName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isHidden}
                  onChange={(e) => setIsHidden(e.target.checked)}
                />
              }
              label="Kartı Gizle"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} color="primary">
          {cardData ? "Güncelle" : "Ekle"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCardDialog;
