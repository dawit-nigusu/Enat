import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {
    Text,
} from 'react-native'
import { shallow } from 'enzyme'

import Header from '../Header';

describe('Header test', () => {
    const navigation = {navigate: jest.fn(()=>Promise.resolve(0))};

    it('renders header', () => {
        const header = renderer.create(
            <Header navigation={navigation}/>
        ).toJSON();
        expect(header).toMatchSnapshot();


    })
})
