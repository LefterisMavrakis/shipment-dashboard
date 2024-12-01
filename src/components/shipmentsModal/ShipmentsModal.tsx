import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import shipmentsAPI from "../../api/api";
import Flex from "../shared/styledFlex";
import { ShipmentsList } from "../../api/types/types";
import ShipmentItem from "../shipmentItem/ShipmentItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import companiesMock from "../../api/data/companies.json";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "500px",
    minHeight: "60vh",
    maxHeight: "80vh",
    height: "100%",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ShipmentsModal = () => {
  const navigate = useNavigate();
  const { companyId: paramsCompanyId } = useParams();
  const [companyShipments, setCompanyShipments] = useState<ShipmentsList>([]);
  const companyName = companiesMock.find(
    (company) => company.companyId === paramsCompanyId
  )?.name;

  const fetchCompanyShipments = useCallback(async () => {
    if (!paramsCompanyId) {
      setCompanyShipments([]);
      return;
    }

    try {
      const result = await shipmentsAPI.getCompanyShipments(paramsCompanyId);

      setCompanyShipments(result);
    } catch {
      console.log("Error during company shipments fetching");
    }
  }, [paramsCompanyId, setCompanyShipments]);

  const hasShipments = companyShipments.length > 0;

  const closeModal = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchCompanyShipments();
  }, [fetchCompanyShipments]);

  return (
    <BootstrapDialog
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      open={!!paramsCompanyId}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {`${companyName || "Company"}`} - Shipments
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        {hasShipments ? (
          <Flex flexDirection="column" spacingSize="8px" fullwidth>
            {companyShipments.map((shipment) => (
              <ShipmentItem {...shipment} />
            ))}
          </Flex>
        ) : (
          <Typography>No shipments</Typography>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ShipmentsModal;
