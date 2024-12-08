import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
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
    maxHeight: "80vh",
    height: "100%",
    borderRadius: "40px",
  },
  "& .MuiDialogContent-root": {
    padding: "24px 40px",
    borderBottom: "none",
  },
  "& .MuiDialogTitle-root": {
    fontWeight: "800",
    padding: "32px 40px 25px 40px",
  },
  "@media (max-width: 767px)": {
    "& .MuiDialogTitle-root": {
      fontWeight: "800",
      padding: "20px 50px 20px 20px",
    },
    "& .MuiDialogContent-root": {
      padding: "20px",
      borderBottom: "none",
    },
    "& .MuiIconButton-root": {
      top: 18,
      right: 10,
    },
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
      <DialogTitle
        sx={{ m: 0, p: 2, paddingRight: 7 }}
        id="customized-dialog-title"
      >
        {`${companyName || "Company"} - Shipments (${companyShipments.length})`}
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={(theme) => ({
          position: "absolute",
          right: 30,
          top: 30,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        {hasShipments ? (
          <Flex $flexDirection="column" $spacingSize="32px" $fullwidth>
            {companyShipments.map((shipment, index) => (
              <ShipmentItem key={index} {...shipment} index={index + 1} />
            ))}
          </Flex>
        ) : (
          <Flex $justifyContent="center" $fullwidth>
            <Typography>There are no shipments for this company</Typography>
          </Flex>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default ShipmentsModal;
