"use client";
import { CardRelationType } from "@/types/Services/CardServiceTypes";
import { DataErrorType } from "@/types/types";
import { Grid, Card, CardContent, IconButton, Typography, Tooltip, DialogActions, Button, DialogContentText, DialogTitle, Dialog, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { DeleteCard, ToggleCardVisibility } from "@/Services/CardServices";
import { toast } from "react-toastify";
import AddEditCardDialog from "@/components/dialogs/add-edit-card";
import AddIcon from "@mui/icons-material/Add";

const CardsView = ({ CardData }: { CardData: DataErrorType<CardRelationType[]> }) => {
  const defaultList = { data: [], error: false, errorMessage: "" };
  const [currentList, setCurrentList] = useState(CardData || defaultList);
  const [selectedCard, setSelectedCard] = useState<CardRelationType|undefined>(undefined)
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [CardToDelete, setCardToDelete] = useState<number | null>(
      null
    )
 useEffect(() => {
    if (currentList.error) {
      toast.error(currentList.errorMessage);
    }
  }, [currentList]);



  const handleDelete = async () => {
    if (CardToDelete !== null) {
      const success = await DeleteCard(CardToDelete);
      if (success) {
        toast.success("Card Silindi");
        setCurrentList((prev) => ({
          ...prev,
          data: prev.data.filter(
            (card) => card.id !== CardToDelete
          ),
        }));
      } else {
        toast.error("Silme işleminde bir hata oluştu");
      }
      setDeleteDialogOpen(false);
      setCardToDelete(null);
    }
  };

  const openDeleteDialog = (id: number) => {
    setCardToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleAddCollection = () => {
    setSelectedCard(undefined);
    setOpen(true);
  };

  // Handle gizleme
  const handleHide = async(id:number) => {
    const res = await ToggleCardVisibility(id);
    if (
      !res.error) {
        setCurrentList((prev) => ({
          ...prev,
          data: prev.data.map((item) =>
            item.id ===id ? { ...item, isHidden:!item.isHidden } : item
          ),
        }));
      } 
    }
        


  return (
    <div>
        <Grid item xs={12} sx={{ textAlign: "right", margin: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCollection}
        >
          Yeni Card
        </Button>
      </Grid>
      {currentList.data.length > 0 ? (
        <Grid
          container
          spacing={2}
          direction="row"
          sx={{ minHeight: "100vh" ,padding:"1rem"}} 
        >
          {currentList.data.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={card.cardId ?? index}>
              <Card
                sx={{
                  position: "relative",
                  height: "200px",
                  width: "250px",
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Action Buttons */}
                <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: "8px" }}>
                 {card.isHidden? <Tooltip title="Görünür yap" >
                    <IconButton
                      size="small"
                      color="warning"
                      sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "lightgray" } }}
                      onClick={() => {
                        setSelectedCard(card)
                        handleHide(card.id)}}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>:
                   <Tooltip title="Gizle" >
                   <IconButton
                     size="small"
                     sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "lightgray" } }}
                     onClick={() => {
                       setSelectedCard(card)
                       handleHide(card.id)}}
                   >
                     <VisibilityOffIcon fontSize="small" />
                   </IconButton>
                 </Tooltip>}
                  <Tooltip title="Sil">
                    <IconButton
                    color="error"
                      size="small"
                      sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "lightgray" } }}
                      onClick={()=>{
                        openDeleteDialog(card.id)
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Güncelle">
                    <IconButton
                    color="info"
                      size="small"
                      sx={{ backgroundColor: "white", "&:hover": { backgroundColor: "lightgray" } }}
                      onClick={() => {setSelectedCard(card)
                        setOpen(true)}
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
                {/* Card Content */}
                <CardContent sx={{ textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ marginBottom: 1 }}>
                    {card.card.frontTitle || "Front Title"}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {card.card.backTitle || "Back Title"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Deste içinde hiç kart yok</Typography>
      )}
            <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu Card silinecek. Emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDeleteDialogOpen(false)} color="success">
            Vazgeç
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Sil
          </Button>
        </DialogActions>
      </Dialog>
      <AddEditCardDialog open={open} setOpen={setOpen} setcardList={setCurrentList} cardData={selectedCard}/>
    </div>
  );
};

export default CardsView;
