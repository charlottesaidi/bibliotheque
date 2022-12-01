import React from 'react';
import styled from 'styled-components';
import Tabs from '@components/Tabs';
import {Profile} from "@pages/Settings/Profile";

const SettingIndex: React.FC = () => {

    return (
        <TabsContainer>
            <Tabs
                tabs={[
                    {
                        title: "Identifiants",
                        render: () => <Profile/>

                    },
                    // {
                    //     title: "Misc",
                    //     render: () =>
                    //         <></>,
                    // },
                ]}
            />
        </TabsContainer>
    );
};

const TabsContainer = styled.div`
`;

export default SettingIndex;