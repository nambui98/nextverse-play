import styled from "@emotion/styled";
import { Card } from "@mui/material";

const CardItem = styled(Card)({
  borderRadius: "12px",
  minWidth: "250px",
  border: '1px solid #E9EAEF',
  boxShadow: "none",
  position: 'relative',
  '&:hover': {
    boxShadow: "0px 2px 24px rgba(0, 0, 0, 0.16)"
  }
});
export {
  CardItem
}