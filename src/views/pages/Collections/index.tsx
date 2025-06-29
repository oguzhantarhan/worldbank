"use client";
import { CollectionType } from "@/types/Services/CollectionsServiceTypes";
import { DataErrorType } from "@/types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import AddEditCollectionDialog from "@/components/dialogs/add-edit-collection";
import { DeleteCollection } from "@/Services/CollectionServices";

type Props = {
  collectionList: DataErrorType<CollectionType[]>;
};

const CollectionsView = ({ collectionList }: Props) => {
  const defaultList = { data: [], error: false, errorMessage: "" };
  const [currentList, setCurrentList] = useState(collectionList || defaultList);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<
    undefined | CollectionType
  >(undefined);
  const [collectionToDelete, setCollectionToDelete] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (currentList.error) {
      toast.error(currentList.errorMessage);
    }
  }, [currentList]);

  const handleDelete = async () => {
    if (collectionToDelete !== null) {
      const success = await DeleteCollection(collectionToDelete);
      if (success) {
        toast.success("Deste Silindi");
        setCurrentList((prev) => ({
          ...prev,
          data: prev.data.filter(
            (collection) => collection.id !== collectionToDelete
          ),
        }));
      } else {
        toast.error("Silme işleminde bir hata oluştu");
      }
      setDeleteDialogOpen(false);
      setCollectionToDelete(null);
    }
  };

  const openDeleteDialog = (id: number) => {
    setCollectionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleAddCollection = () => {
    setSelectedCollection(undefined);
    setOpenDialog(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: "right", margin: "1rem" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCollection}
        >
          Yeni Deste
        </Button>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {currentList.data.length > 0 ? (
          currentList.data.map((collection) => (
            <Grid
              sx={{ height: "400px", width: "300px" }}
              key={collection.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Edit Icon */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 36,
                    backgroundColor: "transparent",
                    boxShadow: 2,
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  onClick={() => {
                    setSelectedCollection(collection);
                    setOpenDialog(true);
                  }}
                >
                  <EditIcon color="primary" />
                </IconButton>

                {/* Delete Icon */}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "transparent",
                    boxShadow: 2,
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                  onClick={() => openDeleteDialog(collection.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>

                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 2,
                    marginTop: "0.5rem",
                  }}
                >
                  <div>
                    <Typography textAlign="center" variant="h4">
                      {collection.collectionName}
                    </Typography>
                    <Typography textAlign="center" color="darkslategray">
                      {collection.collectionDescription ?? "-"}
                    </Typography>
                  </div>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "center", paddingBottom: 2 }}
                >
                  <Button
                    onClick={() => redirect(`/${collection.id}/cards`)}
                    color="primary"
                    variant="contained"
                  >
                    Kartları Gör
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>Buralar Boş Tarla Hadi Yeni Bir Deste Ekle</Typography>
        )}
      </Grid>

      <AddEditCollectionDialog
        collectionData={selectedCollection}
        setOpen={setOpenDialog}
        open={openDialog}
        setCollectionList={setCurrentList}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Silme Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu deste silinecek. Emin misiniz?
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
    </Grid>
  );
};

export default CollectionsView;
