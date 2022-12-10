import React from "react";
import styled from "styled-components";

interface IProps {
    tabs: { title: string; render: any }[]
}

interface IActive {
    active: boolean
}

const Tabs: React.FC<IProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <>
            <TabContainer>
                {tabs.map((tab, index) => (
                    <TabButton
                        key={"Tab_"+index}
                        active={activeTab === index}
                        onClick={() => setActiveTab(index)}
                    >
                        <Title>{tab.title}</Title>
                    </TabButton>
                ))}
            </TabContainer>
            <Container className={'shadow-xl p-10'}>
                {tabs[activeTab].render()}
            </Container>
        </>
    );
};

const Container = styled.div`
    background: rgb(56 189 248 / .1)
`;

const TabContainer = styled.section`
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 60px;
`;

const TabButton = styled.button`
  height: 100%;
  padding: 1rem 2rem;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: 0.6s;
  background: ${(props: IActive) => (props.active ? "rgb(56 189 248 / .1)" : "")};
  &:focus {
    outline: none;
  }
`;

const Title = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  transition: 0.6s;
`;

export default Tabs;