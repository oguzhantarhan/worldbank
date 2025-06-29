export enum EnumBox {
    New = 0,       // 0 minutes
    First = 1,     // 1 minute
    Second = 2,   // 10 minutes
    Third = 3,  // 1 day (1440 minutes)
    Fourth = 4, // 3 days (4320 minutes)
    Fifth = 5, // 1 week (10080 minutes)
    Sixth = 6, // 2 weeks (20160 minutes)
    Seventh = 7, // 1 month (40320 minutes)
    Eighth = 8,  // 2 months (80640 minutes)
    Ninth = 9, // 6 months (241920 minutes)
    Last = 10  // 1 year (483840 minutes)
  }
  
  export type CardType = {
    id?: number;
    frontTitle: string;
    backTitle: string;
    wordDescription?: string;
    text?: string;
    frontTextAudioUrl?: string;
    backTextAudioUrl?: string;
    frontTextImageUrl?: string;
    backTextImageUrl?: string;
  }
  
  export type CardRelationType= {
    card: CardType;
    id: number;
    cardId: number;
    cardCollectionId: number;
    isHidden: boolean;
    currentBox: EnumBox;
    previousBox?: EnumBox;
    lastDueDate: Date;
    nextDueDate?: Date;
  }
  export type AddCardType= {
    card: CardType;
    cardCollectionId: number;
    isHidden:boolean
  }
  export type EditCardtype= {
    card: CardType;
    id: number;
    cardId: number;
    cardCollectionId: number;
    isHidden: boolean;
  }
  export type UpdateCardReletionType= {
    id: number;
    cardId: number;
    cardCollectionId: number;
    isHidden: boolean;
    currentBox: EnumBox;
    previousBox?: EnumBox;
    lastDueDate: Date;
    nextDueDate?: Date;
  }
  export const EnumBoxDurations: { [key in EnumBox]: number } = {
    [EnumBox.New]: 0,         // New = 0 minutes
    [EnumBox.First]: 1,       // First = 1 minute
    [EnumBox.Second]: 10,     // Second = 10 minutes
    [EnumBox.Third]: 1440,    // Third = 1440 minutes (1 day)
    [EnumBox.Fourth]: 4320,   // Fourth = 4320 minutes (3 days)
    [EnumBox.Fifth]: 10080,   // Fifth = 10080 minutes (1 week)
    [EnumBox.Sixth]: 20160,   // Sixth = 20160 minutes (2 weeks)
    [EnumBox.Seventh]: 40320, // Seventh = 40320 minutes (1 month)
    [EnumBox.Eighth]: 80640,  // Eighth = 80640 minutes (2 months)
    [EnumBox.Ninth]: 241920,  // Ninth = 241920 minutes (6 months)
    [EnumBox.Last]: 483840    // Last = 483840 minutes (1 year)
  };