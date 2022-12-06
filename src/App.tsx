import {useEffect} from "react";
import {useGetDatamarts, useGetMethods} from "./api/hooks";
import {useSetRecoilState} from "recoil";
import {datamartsAtom, methodsAtom, selectedDatamartAtom, selectedMethodAtom} from "./store/atoms";
import SelectMethod from "./SelectMethod";
import MethodParams from "./MethodParams";
import SelectDatamart from "./SelectDatamart";
import {DotLoader} from "react-spinners";
import styled from "@emotion/styled";
import SendBuildedButton from "./SendBuildedButton";
import IpInput from "./IpInput";
import PortInput from "./PortInput";
import SQLInput from "./SQLInput";
import Result from "./Result";
import SendCustomButton from "./SendCustomButton";

const Container = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: center;
  max-width: 500px;
  width: 100%;
`

const AddressInputs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function App() {

  const [{data: methodsData, loading: methodsLoading, error: methodsError}] = useGetMethods()
  const [{data: datamartsData, loading: datamartsLoading, error: datamartsError}] = useGetDatamarts()
  const setMethods = useSetRecoilState(methodsAtom)
  const setSelectedMethod = useSetRecoilState(selectedMethodAtom)
  const setDatamarts = useSetRecoilState(datamartsAtom)
  const setSelectedDatamart = useSetRecoilState(selectedDatamartAtom)

  useEffect(() => {
    if (!methodsData) {
      setMethods([])
    } else {
      setMethods(methodsData)
      setSelectedMethod({
        id: methodsData[0].id,
        name: methodsData[0].method
      })
    }
  }, [methodsData])

  useEffect(() => {
    if (!datamartsData) {
      setDatamarts([])
    } else {
      setDatamarts(datamartsData)
      setSelectedDatamart(datamartsData[0].datamart)
    }
  }, [datamartsData])

  return <Container>
    {
      datamartsLoading || methodsLoading ? (
        <DotLoader color={"rgb(25, 118, 210)"}/>
      ) : (
        <>
          <Content>
            <AddressInputs>
              <IpInput/>
              <PortInput/>
            </AddressInputs>
            <SelectDatamart/>
            <SelectMethod/>
            <MethodParams/>
            <SendBuildedButton/>
            <SQLInput/>
            <SendCustomButton/>
          </Content>
          <Result/>
        </>
      )
    }
  </Container>
}

export default App
