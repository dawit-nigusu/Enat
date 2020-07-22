import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { SubTitleHeader, Paragraph, Bold, TitleHeader } from "../Detail";

describe('Detail page components test', () => {
    it('renders title component', () => {
        expect(renderer.create(
            <TitleHeader text={'hello'}/>
        ).toJSON()).toMatchSnapshot();
    });

    it('renders SubTitle component', () => {
        const subtitle = renderer.create(
            <SubTitleHeader text={'hello'}/>
        ).toJSON();
        expect(subtitle).toMatchSnapshot();
    });

    it('renders paragraph component', () => {
        const paragraph = renderer.create(
            <Paragraph text={'hello'}/>
        ).toJSON();
        expect(paragraph).toMatchSnapshot();
    });

    it('renders bold component', () => {
        expect(renderer.create(
            <Bold text={'hello'}/>
        ).toJSON()).toMatchSnapshot();
    });
});
