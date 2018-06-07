import React, { Component } from 'react';

import { PageContainer, Analysis, PageSection, Subtitle, TextBlock } from '../components';

import { connect } from 'react-redux';

import { analysisData } from '../data/analysis';

class PanelPage extends Component
{    
    renderAnalysis(currency, panelData)
    {
        let empty = 0;
        return <PageSection key={currency} horizontal="left">
            <Subtitle>{currency.split('_').join(' ')}</Subtitle>
            {panelData[currency].map((show, id) => {
                if(show)
                    return <Analysis key={id} id={id} name={analysisData[id].name} currency={currency} description={false} />
                else empty++;
                if(empty === panelData[currency].length) return <TextBlock key={id}>{`Aby dodać analizę dla ${currency.split('_').join(' ')}, wejdź na podstronę pary walutowej w zakładce na dole.`}</TextBlock>
            })}
        </PageSection>
    }
    
    render()
    {
        return(
            <PageContainer>
                {Object.keys(this.props.panel).map(currency => this.renderAnalysis(currency, this.props.panel))}
            </PageContainer>
        )
    }
}

function mapStateToProps({ panel })
{
    return { panel };
}

export default connect(mapStateToProps)(PanelPage);