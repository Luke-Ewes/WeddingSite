import "./DetailsPage.css"
import {type ReactNode, useRef, useState} from "react";
import DressCode from "./detailsOptions/DressCode.tsx";
import Program, {type PlanningItem} from "./detailsOptions/Program.tsx";
import Location from "./detailsOptions/Location.tsx";
import PresentIdeas from "./detailsOptions/PresentIdeas.tsx";
import {smoothScrollToElement} from "../Scripts/SmoothScroll.ts";

import castleIcon from "../assets/svg/castle-1-svgrepo-com.svg?react";
import ringIcon from "../assets/svg/interlocking-rings-svgrepo-com.svg?react"
import cakeIcon from "../assets/svg/cel-cake-wedding-svgrepo-com.svg?react"
import dinnerIcon from "../assets/svg/cutlery-set-of-three-pieces-svgrepo-com.svg?react"
import musicIcon from "../assets/svg/music-notes-svgrepo-com.svg?react"
import PizzaIcon from "../assets/svg/pizza-svgrepo-com.svg?react"

interface DetailOption {
    label: string;
    value: () => ReactNode;
}

const DayItems: PlanningItem[] = [
    {time:"13:30", description:"Ontvangst", icon: castleIcon },
    {time:"14:00", description:"Ceremonie", icon:ringIcon},
    {time:"14:45", description:"Receptie", icon: cakeIcon},
    {time:"17:00", description:"Diner", icon: dinnerIcon},
    {time:"20:00", description:"Feest", icon: musicIcon},
    {time:"00:00", description:"Afsluiting", icon: PizzaIcon},
]

const EveningItems: PlanningItem[] = [
    {time:"19:30", description:"Ontvangst", icon: castleIcon},
    {time:"20:00", description:"Feest", icon: musicIcon},
    {time:"00:00", description:"Afsluiting", icon: PizzaIcon},
]

const options: DetailOption[] = [
    {label: "👗 Dress Code" , value: () => <DressCode />},
    {label: "☀️ Dagprogramma" , value: () => <Program planningItems={DayItems}/>},
    {label: "🌙 Avondprogramma" , value: () => <Program planningItems={EveningItems}/>},
    {label: "📍 Locatie", value: () => <Location location={"Kasteel de Essenburg, Hierden"}/>},
    {label: "🎁 Cadeau Ideetjes", value: () => <PresentIdeas />}

]

function DetailsPage() {
    const [selectedOption, setSelectedOption] = useState<DetailOption>(options[0]);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const accordionRefs = useRef<Map<string, HTMLElement>>(new Map());

    return (
        <div className={"details-page"}>
            <div className={"details-page__title"}>
                <h1>Details</h1>
            </div>

            <div className={"details-page__foldout"}>
                {/* Desktop: keuzemenu */}
                <div className={"details-page__foldout-options"}>
                    {options.map((option) => (
                    <button
                        key={option.label}
                        type="button"
                        onClick={() => setSelectedOption(option)}
                        className={`details-page__foldout-option ${option === selectedOption ? "details-page__foldout-option--selected" : ""}`}>
                        {option.label}
                    </button>
                    ))}
                </div>

                <div className={"details-page__foldout-content"}>
                    {options.map((option) => (
                        <div
                            key={option.label}
                            hidden={selectedOption.label !== option.label}
                        >
                            {option.value()}
                        </div>
                    ))}
                </div>

                <div className={"details-page__accordion"}>
                    {options.map((option) => {
                        const isOpen = openAccordion === option.label;
                        return (
                            <section
                                key={option.label}
                                ref={(element) => {
                                    if(element){
                                        accordionRefs.current.set(option.label, element);
                                    }
                                    else{
                                        accordionRefs.current.delete(option.label);
                                    }
                                }}
                                className={`details-page__accordion-item ${
                                isOpen ? " details-page__accordion-item--open" : ""}`}>

                                <button
                                    type="button"
                                    className={"details-page__accordion-header"}
                                    onClick={() => {
                                        const willOpen = openAccordion !== option.label;

                                        setOpenAccordion(willOpen ? option.label : null);

                                        if (!willOpen || !window.matchMedia("(max-width: 600px)").matches) {
                                            return;
                                        }

                                        const element = accordionRefs.current.get(option.label);

                                        if (!element) {
                                            return;
                                        }

                                        window.setTimeout(() => {
                                            smoothScrollToElement(element, 750, 100);
                                        }, 200);
                                    }}>

                                    <span>{option.label}</span>
                                    <span
                                        className={"details-page__accordion-icon"}>
                                        {isOpen ? "-" : "+"}
                                    </span>
                                </button>

                                <div
                                    className={`details-page__accordion-content ${
                                        isOpen ? "details-page__accordion-content--open" : ""
                                    }`}
                                    aria-hidden={!isOpen}
                                    inert={!isOpen}
                                >
                                    <div className="details-page__accordion-content-inner">
                                        {option.value()}
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>

            <div className={"spacer__bottom"}/>
        </div>
    )
}

export default DetailsPage;
