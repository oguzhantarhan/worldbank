"use client";
import { CollectionType } from "@/types/Services/CollectionsServiceTypes";
import { DataErrorType } from "@/types/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  collectionList: DataErrorType<CollectionType[]>;
};

const StudyView = ({ collectionList }: Props) => {
  const router = useRouter();
  const defaultList = { data: [], error: false, errorMessage: "" };
  const [currentList, setCurrentList] = useState(collectionList || defaultList);

  useEffect(() => {
    if (currentList.error) {
      toast.error(currentList.errorMessage);
    }
  }, [currentList]);

  return (
    <Grid container>
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
                    onClick={() => {
                      router.push(`/${collection.id}/study-dashboard`);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Çalışmaya Başla
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : null}
      </Grid>
    </Grid>
  );
};

export default StudyView;
