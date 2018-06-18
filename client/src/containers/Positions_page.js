import React, { Component } from 'react';

import { PageContainer, PageSection, Subtitle, PositionsTable } from '../components';

import { connect } from 'react-redux';

class PositionsPage extends Component
{    
    renderRow(position, key)
    {
        return <tr key={key}>
            <td>{position.instrument}</td>
        </tr>
    }
    
    render()
    {
        return(
            <PageContainer>
                <PageSection>
                    <Subtitle>
                        Aktualne pozycje:
                    </Subtitle>
                    <PositionsTable positions={ this.props.positions.active } stream={ this.props.stream } />
                </PageSection>
                <PageSection>
                    <Subtitle>
                        Historia pozycji:
                    </Subtitle>
                    <PositionsTable positions={ this.props.positions.history } stream={ this.props.stream } />
                </PageSection>
            </PageContainer>
        )
    }
}

function mapStateToProps({ positions, stream })
{
    return { positions, stream };
}

export default connect(mapStateToProps)(PositionsPage);