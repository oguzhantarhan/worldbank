"use client"
import {  UpdateCardReletion } from "@/Services/CardServices";
import {
  CardRelationType,
  EnumBox,
  EnumBoxDurations,
} from "@/types/Services/CardServiceTypes";
import { DataErrorType } from "@/types/types";
import React, { useState } from "react";
import FlashCard from "@/components/flash-card/flashCard";

export enum actions {
  easy = 0,
  normal = 1,
  hard = 2,
}
type Props = {
  studyList: DataErrorType<CardRelationType[]>;
};
const StudyDashboardView = ({ studyList }: Props) => {
  
  const [list, setList] = useState(studyList.data);
  const [selectedCard, setSelectedCard] = useState<CardRelationType|undefined>(list[0]);

  const handleAction = async(action: actions) => {
    
 if (selectedCard) {
    let nextBox = selectedCard.currentBox;
    let prevBox = selectedCard.previousBox ?? 0;
    const lastDueDate = Date.now();
    let nextDueDate = lastDueDate;

    if (action === actions.easy) {
      if (nextBox >= prevBox) {
        nextBox = nextBox !== 10 ? nextBox + 1 : nextBox;
      } else {
        nextBox = prevBox;
      }
      nextDueDate += EnumBoxDurations[nextBox]*60000;
    } else if (action === actions.normal) {
      if (nextBox < prevBox) {
        prevBox = prevBox <= 1 ? 0 : prevBox - 1;
      }
      nextBox = EnumBox.First;
      nextDueDate += EnumBoxDurations[nextBox]*60000;
    } else {
      prevBox = prevBox <= 2 ? 0 : prevBox - 2;
      nextBox = EnumBox.First;
      nextDueDate += EnumBoxDurations[nextBox]*60000;
    }
    console.log(selectedCard);
    
   var updatedCard
   setList((prev) => {
    const updatedList = prev.filter((item) => item.id !== selectedCard.id);
     updatedCard = {
      ...selectedCard,
      currentBox: nextBox,
      lastDueDate: new Date(lastDueDate),
      nextDueDate: new Date(nextDueDate),
      previousBox: prevBox,
    };
    getNextAvailableCard(updatedList) 
    return [...updatedList, updatedCard]
  });

  console.log(updatedCard,"updatedcard");
  
await UpdateCardReletion(
  {
    cardCollectionId:updatedCard!.cardCollectionId,
    cardId:updatedCard!.cardId,
    currentBox:updatedCard!.currentBox,
    id:updatedCard!.id,
    isHidden:updatedCard!.isHidden,
    lastDueDate:updatedCard!.lastDueDate,
    nextDueDate:updatedCard!.nextDueDate,
    previousBox:updatedCard!.previousBox,
  }
 )

}
  };
  const getNextAvailableCard = (list:CardRelationType[]) => {
    const now = Date.now();
    
    setSelectedCard(
      list.find((card) => {
        // nextDueDate değeri undefined veya null ise 'now' kullanıyoruz
        const nextDueDate = card.nextDueDate ? new Date(card.nextDueDate) : null;
    
        // Eğer nextDueDate geçerli bir tarih değilse, 'now' ile karşılaştırma yapıyoruz
        const nextDue = nextDueDate && !isNaN(nextDueDate.getTime()) ? nextDueDate.getTime() : now;
    
        return nextDue <= now;
      })
    );
    
  };
  return <div>
    {selectedCard?
  <FlashCard
  data={selectedCard}
  handleAction={handleAction}
  /> 
  :<>Çalışılacak Kart Kalmadı</>}
  </div>
};

export default StudyDashboardView;
