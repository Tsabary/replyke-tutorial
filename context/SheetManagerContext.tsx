import { useRef } from "react";
import React, { createContext, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type SheetManagerContext = {
  commentSetionSheetRef: React.RefObject<BottomSheetMethods>;
  collectionsSheetRef: React.RefObject<BottomSheetMethods>;

  openCommentSectionSheet: (newEntityId?: string) => void;
  closeCommentSectionSheet: () => void;

  openCollectionsSheet: (newEntityId?: string) => void;
  closeCollectionsSheet: () => void;

  commmentsEntityId: string | null;
  collectionsEntityId: string | null;
};

export const SheetManagerContext = createContext<Partial<SheetManagerContext>>(
  {}
);

export const SheetManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Ref for the comment section sheet
  const commentSetionSheetRef = useRef<BottomSheet>(null);

  // Ref for the collections sheet
  const collectionsSheetRef = useRef<BottomSheet>(null);

  // The entity for which the user is the comment section
  const [commmentsEntityId, setCommentsEntityId] = useState<string | null>(
    null
  );

  // The entity the user wants to add to a collection
  const [collectionsEntityId, setCollectionsEntityId] = useState<string | null>(
    null
  );

  // Function to open the comment section sheet and set the entity
  const openCommentSectionSheet = (newEntityId?: string) => {
    if (newEntityId) setCommentsEntityId(newEntityId);

    commentSetionSheetRef.current?.snapToIndex(0);
  };

  const closeCommentSectionSheet = () => {
    commentSetionSheetRef.current?.close();
    setCommentsEntityId(null);
  };

  const openCollectionsSheet = (newEntityId?: string) => {
    if (newEntityId) setCollectionsEntityId(newEntityId);
    collectionsSheetRef.current?.snapToIndex(0);
  };

  const closeCollectionsSheet = () => {
    collectionsSheetRef.current?.close();
    setCollectionsEntityId(null);
  };

  return (
    <SheetManagerContext.Provider
      value={{
        commentSetionSheetRef,
        collectionsSheetRef,

        openCommentSectionSheet,
        closeCommentSectionSheet,
        openCollectionsSheet,
        closeCollectionsSheet,

        commmentsEntityId,
        collectionsEntityId,
      }}
    >
      {children}
    </SheetManagerContext.Provider>
  );
};
