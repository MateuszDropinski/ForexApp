import React, { Component } from 'react';
import { PageContainer, PageSection, Subtitle, TextBlock, Analysis } from '../components';

import { Link } from 'react-router-dom';

import { Banner, Header } from './styles/main_page';

import { analysisData } from '../data/analysis';

class MainPage extends Component
{
    renderAnalysis(analysis)
    {
        return <Analysis id={analysis.id} key={analysis.id} description={true} />;
    }
    
    render()
    {
        return(
            <PageContainer>
                <Banner>
                    <Header>Mój Forex</Header>
                </Banner>
                <PageSection horizontal="left">
                    <Subtitle>1. Kilka słów o Forex</Subtitle>
                    <TextBlock>Forex to nic innego jak rynek walutowy. Jest to również największy na świecie rynek, dzienny obrót to ponad 1,5 biliona dolarów amerykańskich. By móc handlować wystarczą pieniądze, rachunek walutowy i internet. Notowania trwają 24 godziny na dobę przez 5 dni w tygodniu wyłączając święta. Przez przesunięcie czasowe w każdym miejscu giełdy otwierane i zamykane są o różnych godzinach.</TextBlock>
                    <TextBlock>Kilka ważnych pojęć:</TextBlock>
                    <TextBlock><strong>- Bid - </strong>jest to cena po której otwierane są zlecenia sprzedaży i zamykane zlecenia kupna,</TextBlock>
                    <TextBlock><strong>- Ask - </strong>jest to cena po której otwierane są transakcje kupna i zamykane transakcje sprzedaży,</TextBlock>
                    <TextBlock><strong>- Spread - </strong>różnica między ceną Ask, a Bid. Otwierając pozycję kupna, otwiera się ją po cenie Ask, a zamyka po Bid, w przypadku sprzedaży jest na odwrót,</TextBlock>
                    <TextBlock><strong>- Lot - </strong>w przypadku par walutowych 1 lot odpowiada 100000 jednostek waluty bazowej,</TextBlock>
                    <TextBlock><strong>- Pips - </strong>czwarta cyfra po przecinku, w przypadku par z jenem druga. Pips cząstkowy to piąta cyfra po przecinku w przypadku par walutowych, oprócz jena,</TextBlock>
                    <TextBlock><strong>- dźwignia finansowa - </strong>umożliwia kupowanie dużej ilości waluty mając mniej pieniędzy, co zwiększa ryzyko dużych strat i szanse dużych zysków.</TextBlock>
                </PageSection>
                <PageSection horizontal="left">
                    <Subtitle>2. Czym jest ta aplikacja?</Subtitle>
                    <TextBlock>Jest to aplikacja stworzona przez: <a href="https://github.com/MateuszDropinski">https://github.com/MateuszDropinski</a> w celu połączenia dwóch hobby jakimi są: forex i programowanie. Została ona stworzona głównie w celach edukacyjnych.</TextBlock>
                    <TextBlock>Co znajduje się na stronie:</TextBlock>
                    <TextBlock><strong>- pary walutowe - </strong>na dole strony znajduje się wysuwana sekcja z wybranymi przeze mnie sześcioma parami walutowymi, które są aktualizowane w rzeczywistym czasie. Po wybraniu jednej z nich można przejść do podstrony analiz danej waluty. W tym miejscu można również symulować kupno, oraz sprzedaż konkretnych par, aby zamknąć zlecenie trzeba wejść w zakładkę <Link to='/orders'>"Historia zleceń"</Link>. Znajdują się tam aktualnie otwarte zlecenia i te już zamkniętę, pokazane jest jedynie na pipsach czy zlecenie dałoby zysk czy nie,</TextBlock>
                    <TextBlock><strong>- <Link to="/panel">panel analiz</Link> - </strong>w panelu analiz znajdują się wybrane przez Ciebie analizy, które znajdziesz po kliknięciu w wybraną przez Ciebie parę walutową w panelu par walutowych na dole. Panel analiz zapisuje się dla każdej przeglądarki,</TextBlock>
                    <TextBlock><strong>- <Link to="/orders">historia zleceń</Link> - </strong>w historii zleceń znajdują się zamknięte zlecenia i otwarte, które można tam zamknąć.</TextBlock>
                </PageSection>
                <PageSection horizontal="left">
                    <Subtitle>3. Moje analizy</Subtitle>
                    <TextBlock>W ramach nauki stworzyłem pięć własnych analiz, które sam wymyśliłem. Określają one procentowo czy cena powinna wzrosnąć czy zmaleć (zielony pasek - wzrost, czerwony pasek - spadek). Trzeba jednak pamiętać o takich rzeczach jak duża nieprzewidywalność rynku, publikacja różnych danych, wypowiedzi ważnych person, wydarzenia na świecie, które mają duży wpływ na wygląd rynku. Każda para walutowa ma na swojej podstronie generowane te analizy, które można zapisać do panelu analiz, aby mieć konkretne pod ręką. Odświeżają się same co godzinę i określają wzrost, lub spadek na podstawie ceny zamknięcia w ostatniej godzinie.</TextBlock>
                    <TextBlock>Moje analizy:</TextBlock>
                    {analysisData.map(analysis => this.renderAnalysis(analysis))}
                </PageSection>
                <PageSection horizontal="left">
                    <Subtitle>4. Ostrzeżenie o ryzyku</Subtitle>
                    <TextBlock>Handel walutami obcymi na marży wiąże się z wysokim poziomem ryzyka i może nie być odpowiedni dla wszystkich inwestorów. Wysoki stopień dźwigni może działać zarówno przeciwko Tobie, jak i dla Ciebie. Przed podjęciem decyzji o wymianie walutowej należy starannie rozważyć cele inwestycyjne, poziom doświadczenia i apetyt na ryzyko. Istnieje możliwość, że poniesiesz stratę przekraczającą początkową inwestycję. Powinieneś zdawać sobie sprawę z całego ryzyka związanego z obrotem walutami i zasięgnąć porady niezależnego doradcy finansowego, jeśli masz jakiekolwiek wątpliwości.</TextBlock>
                </PageSection>
            </PageContainer>        
        )
    }    
}

export default MainPage;