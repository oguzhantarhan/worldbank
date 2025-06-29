"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  IconButton,
  CardActions,
} from "@mui/material";

import "./FlashCard.css";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { actions } from "@/views/pages/StadyDashboard";
import { CardRelationType } from "@/types/Services/CardServiceTypes";


interface FlashCardProp {
  data?:CardRelationType
  cardData?: {
    id?: number;
    frontTitle: string;
    backTitle: string;
    wordDescription?: string;
    text?: string;
    frontTextAudioUrl?: string;
    backTextAudioUrl?: string;
    frontTextImageUrl?: string;
    backTextImageUrl?: string;
  };
  handleAction: (action: actions) => Promise<void>
}

const FlashCard: React.FC<FlashCardProp> = ({ data,handleAction }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardData=data?.card
  useEffect(() => {
  }, [data])

  

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };


  const audioRef1 = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);

  const handlePlay1 = () => {
    if (audioRef1.current) {
      audioRef1.current.play().catch((error) => {
        console.error("Ses 1 çalınırken bir hata oluştu:", error);
      });
    }
  };

  const handlePlay2 = () => {
    if (audioRef2.current) {
      audioRef2.current.play().catch((error) => {
        console.error("Ses 2 çalınırken bir hata oluştu:", error);
      });
    }
  };
  return (
    <Card className={`flash-card ${isFlipped ? "flipped" : ""}`}>
      {cardData ? (
        <Grid container className="flash-card-inner">
          {/* Ön yüz */}
          <Grid className="flash-card-front">
            <CardContent>
              <Typography variant="h5" component="div">
                {cardData.frontTitle}
              </Typography>
              {cardData.frontTextImageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={cardData.frontTextImageUrl}
                  alt="Front"
                />
              )}
              {cardData.frontTextAudioUrl && (
                <>
                  <audio
                    ref={audioRef1}
                    src={cardData.frontTextAudioUrl}
                    preload="auto"
                  />
                  <IconButton onClick={handlePlay1} aria-label="Play Sound 1">
                    <PlayArrowIcon fontSize="large" color="primary" />
                  </IconButton>
                </>
              )}
              {cardData.wordDescription && (
                <Typography variant="body2" color="text.secondary">
                  {cardData.wordDescription}
                </Typography>
              )}
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFlip}
              className="flip-button"
            >
              Cevabı Gör
            </Button>
          </Grid>

          {/* Arka yüz */}
          <Grid item xs={12} className="flash-card-back">
            <CardContent>
              <Typography variant="h5" component="div">
                {cardData.backTitle}
              </Typography>
              {cardData.backTextImageUrl && (
                <CardMedia
                  component="img"
                  height="140"
                  image={cardData.backTextImageUrl}
                  alt="Back"
                />
              )}
              {cardData.backTextAudioUrl && (
                <>
                  {" "}
                  <audio
                    ref={audioRef2}
                    src={cardData.backTextAudioUrl}
                    preload="auto"
                  />
                  <IconButton onClick={handlePlay2} aria-label="Play Sound 2">
                    <PlayArrowIcon />
                  </IconButton>
                </>
              )}
              {cardData.text && (
                <Typography variant="body2" color="text.secondary">
                  {cardData.text}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button onClick={()=>{handleAction(actions.hard)
                     handleFlip()
                  }} color="error">Zor</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={()=>{handleAction(actions.normal)
                    handleFlip()
                  }}>Orta</Button>
                </Grid>
                <Grid item xs={4}>
                  <Button onClick={()=>{handleAction(actions.easy)
                     handleFlip()
                  }} color="success">Kolay</Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          height={"100%"}
        >
          <Typography variant="h4" textAlign={"center"} color={"white"}>
            Çalışılacak kart kalmadı tebrikler
          </Typography>
          <Link href={"/study"}>Çalışma Sayfasına Dön</Link>
        </Grid>
      )}
    </Card>
  );
};

export default FlashCard;
