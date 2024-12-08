import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Flex from "../shared/styledFlex";
import shipmentsAPI from "../../api/api";
import { CompaniesList as CompaniesListType } from "../../api/types/types";
import CompanyItem from "../companyItem/CompanyItem";
import { GridContainer } from "./styledComponents";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<CompaniesListType>([]);

  const fetchCompanies = async () => {
    try {
      const result = await shipmentsAPI.getCompanies();

      setCompanies(result);
    } catch {
      console.log("An unexpected error occured during companies fetching");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Flex $flexDirection="column" $spacingSize="32px" $fullwidth>
      <Typography variant="h5">Companies list</Typography>

      <GridContainer>
        {companies.map((company) => {
          return <CompanyItem key={company.companyId} {...company} />;
        })}
      </GridContainer>
    </Flex>
  );
};

export default CompaniesList;
