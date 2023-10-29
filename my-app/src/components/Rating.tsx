import React, { FC, ReactElement, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import StarRateIcon from "@mui/icons-material/StarRate";

type ChildProps = {
    value: number;
  };

const StarRating: FC<ChildProps> = ({value}): ReactElement => {
  return (
    <div>
      <Rating
        name="customized-icons"
        value={value}
        emptyIcon={<StarRateIcon fontSize="inherit" />}
      />
    </div>
  );
};

export default StarRating;
