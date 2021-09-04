import React from 'react'
import MarkdownPage from '../containers/MarkdownPage';
import { react as MdFaqs, attributes } from '../content/homepage/faqs.md';


export default function FaqPage(){
    return (
        <MarkdownPage title={attributes.title}>
            <MdFaqs/>
        </MarkdownPage>
    )
}
