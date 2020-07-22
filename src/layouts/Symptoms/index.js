import React, {Component} from "react";
import { View, Alert } from "react-native";
import {
    Container, Content, Button, Accordion, Segment, Text, Icon, Toast
} from "native-base";
import {Row} from "react-native-easy-grid";
import CustomIcon from "../Common/Icons";
import styles from "./styles";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { DetailHeader, ImageJumbotron } from "../Common/Detail";
import Table from "./table";
import Banner from "../Common/Banner";
import { retrieveItem, removeItem, addItemToArray } from "../../Storage";
import moment from "moment/moment";
import { toEthiopian } from "../../Calendar";

const cover = require('../../../assets/sidemenu/symphtoms.jpg');

const symptoms = [
        {
            name: "ከፍተኛ ድካም",
            key: "symOne",
            message: "ለምን፡ በእርግዝና ወቅት ሰዉነት ለጽንሱ ከፍተኛ የሆነ ሃይል ስለሚያስፈለግና  ሰዉነትሽም ለዚህ ምላሽ ስለሚሰጥ የድካም ስሜት ሊኖር ይችላል፡፡ ይሁንና ድካሙ በጣም ከፍተኛና በእረፍት የማይሻሻል ከሆነ ቶሎ ወደ ጤና ተቋም መሄድና ማማከር ያስፈልጋል፡፡\n" +
            "ምን ላድርግ፡ በቂ የሆነ እረፍት ማድረግ፣ አመጋገብን ማስተካከልና ከባድ ስራዎችን አለመስራት",
            icon: "fatigue"
        },
        {
            name: "የእንቅልፍ ችግር",
            key: "symTwo",
            message: "ለምን፦ ቶሎ ቶሎ ሽንት ቤት በመሄድሽ ፤ በልጅሽ እንቅስቃሴ ወዘተ\n" +
                "ምን ላድርግ? \n" +
                "- በጊዜ ወደ አልጋ መሄድ ፣\n" +
                "- በተመሳሳይ ሰአት መተናት ፣ \n" +
                "- ከእንቅልፍ በፊት ብዙ ፈሳሽ አለመጠጣት፣ \n" +
                "- ትራስ መጠቀም፦ ሆድሽ ስር፣ በጉልበቶችሽ መሃል \n",
            icon: "sleepProblem",
        },
        {
            name: "የትንፉሽ ማጠር",
            key: "symThree",
            message: "ለምን ፦ የማህፀንሽ ዕድገት ሌሎች የውስጥ ኦርጋኖችሽን መጫን፣ በልብ ላይ " +
                "እርግዝና የሚያመጣው ጫና አንዳንድ ጊዘም የተለያዩ ውስጣዊ  ህመሞች መገለጫ ሊሆን ይችላል።\n" +
                "ምን ላድርግ \n" +
                "- አቀማመጥ ማስተካከል \n" +
                "- ስትተኚ ትራስ መጠቀም \n" +
                "- እረፍት መውሰድ \n" +
                "- ሃኪምሽን አማክሪ\n",
            icon: "breathShortening",
        },
        {
            name: "የቁርጠት ስሜት",
            key: "symFour",
            message: "ለምን፦ የማህጸን መወጠር፣ የማህፀን መኮማተር፤ ሀሰተኛ ምጥ፤\n" +
                "ምን ላድርግ ፦\n" +
                "• አቀማመጥ ማስተካከል\n" +
                "• በቂ ፈሳሽ መውሰድ \n" +
                "• ተጨማሪ ምልክቶች ካሉ፣ የማይጠፋ ከፍተኛ ቁርጠት ካለ፣ደም ከታየ፣ ሃኪምሽን አማክሪ\n" +
                "• የፀባይ ለውጥ\n",
            icon: "stomach"
        },
        {
            name: "የጡት ማደግ እና ህመም  ስሜት ",
            key: "symFour",
            message: "ከጡት ውሀማ የሆነ ወተት መውጣት ሊኖር ይችላል ።\n" +
                "ለምን? በሆርሞን ለውጦች ምክንያት \n" +
                "• ምን ላድርግ? \n" +
                "• የእርግዝና ጡት ማስያዣ ማድረግ፤ \n" +
                "• አስፈላጊ ከሆነ ጡት ማስያዣ ዉስጥ ለዚሁ የተዘጋጀ ፓድ ማድረግ\n",
            icon: "breastPacing",
        },
        {
            name: "ሆድ ድርቀት",
            key: "symFive",
            message: "ለምን? በ በሆርሞን ለውጦች ምክንያት የአንጀት ጡንቻዎች መፍታታት\n" +
                "ምን ላድርግ? \n" +
                "• እንቅስቃሴ ማድረግ፤\n" +
                "• በቂ ውሀ መጠጣት፤\n" +
                "• ፋይበር ያለበት ምግብ መብላት ፡ ለምሳሌ ፍራፍሬ እና የበሰለ አትክልት\n",
            icon: "stomachache"
        },
        {
            name: "የደረት ማቃጠል",
            key: "symSix",
            message: "ለምን፦ በሚፈጩ አካላት ጡንቻዎች መፍታታት፣  በጨጉዋራ ወደላይ መገፋት\n" +
                "ምን ላድርግ? \n" +
                "• እንደበላሽ አትተኚ፣ \n" +
                "• ሶስቴ በዛ አርጎ ከመብላት  ትንንሽ መጠን ደጋግመሽ ብይ፣ \n" +
                "• ቅመም የበዛበት ምግብ አትብዪ \n",
            icon: "stomachache"
        },
        {
            name: "የሽንት ቶሎ ቶሎ መምጣት",
            key: "symSeven",
            message: "ለምን ፦ ማህጸን  የሽንት ፊኛን መጫን፣ የሆርሞን ለውጥ፣ የሰውነት የውሃ መጠን መጨመር \n" +
                "ምን ላድርግ?\n" +
                "• በስራ ቦታም ብትሆኚ ሳትሳቀቂ ወደ መፀዳጃ መሄድ\n" +
                "• ሳል እና ማስነጠስ ካለ ሽንት በትንሹ ሊያመልጥ ስለሚችል ፓድ ማድረግ\n" +
                "• የሽንት ቀለም እና ሽታ መቀየር፣ የሽንት ማቃጠል ካሉ፣ የኢንፌክሽን ምልክቶች ሊሆኑ ስለሚችሉ ሃኪምሽን ማማከር\n" +
                "• ቀን በቂ ፈሳሽ መውሰድ ፣ ከእንቅልፍ በፊት መቀነስ\n",
            icon: "urinate",
        },
        {
            name: "የወገብ ህመም",
            key: "symEight",
            message: "ለምን፦ በመገጣጠሚያዎች መሳሳብ፣ ክብደት ከመጨመር ጋር በተያያዘ፣ የሆርሞን ለውጥ\n" +
                "ምን ላርግ?\n" +
                "• አቀማመጥ ማስተካከል\n" +
                "• ለእርግዝና የተዘጋጁ ትራሶችን መጠቀም ወዘተ\n",
            icon: "waistPain",
        },
        {
            name: "የእግር እና የፊት እብጠት ",
            key: "symNine",
            message: "ለምን? በሰውነትሽ ውስጥ ያለው የውሃ እና የደም መጠን በእርግዝና ወቅት ስለሚጨምር፣\n" +
                "ምን ላድርግ\n" +
                "• እግር ከፍ አድርጎ መቀመጥ\n" +
                "• የሚመች ጫማ ማድረግ\n" +
                "• የሚያጣብቁ አልባሳትን አለማድረግ\n" +
                "• በአጭር  ግዜ በጣም ከፍተኛ የሆነ የእብጠት መጨመር ካለ ሐኪምሽን አማክሪ\n",
            icon: "legSwallowing",
        },
        {
            name: "የመዳፍ መቆጥቆጥ፣ መደንዘዝ",
            key: "symTen",
            message: "ለምን፦ በ  እጅ አንጓ ውስጥ ባላ እብጠት \n" +
                "ምን ላድርግ? \n" +
                "• በቻልሽው እጅሽን ማሳረፍ፣ ሃኪምሽን ማማከር \n",
            icon: "slendering"
        },
        {
            name: "የቆዳ ሸንተረር ",
            key: "symElven",
            message: "ለምን? በቆዳ መወጠር \n" +
                "ምን ላድርግ?  መከላከያው አይታወቅም፣ ቆዳሽ ደረቅ አይሁን\n",
            icon: "stretchMarks",
        },
        {
            name: "ማቅለሽለሽ እና ማስመለስ ",
            key: "symTwelve",
            message: "ለምን፦ ሆርሞን ለውጥ\n" +
                "ምን ላድርግ?\n" +
                "• ዝንጅብል ለማቅለሽልሽ ይረዳል \n" +
                "• ቅባት ያልበዛበት ደረቅ ነገር ማዘውተር\n" +
                "• ትንንሽ መጠን ደጋግመሽ ብዪ\n" +
                "• ምልክቶች ካልቀነሱ ሃኪምሽን አናግሪ!\n",
            icon: "nauseaVomiting",
        }
    ];
const months = ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
    'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];

class Symptoms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            seg: 1
        };
        this._reset = this._reset.bind(this);
        this._removeAllSymptoms = this._removeAllSymptoms.bind(this);
        this._storeSymptom = this._storeSymptom.bind(this);
        this._retrieveSymptoms = this._retrieveSymptoms.bind(this);
    }

    componentDidMount(){
        this._retrieveSymptoms();
    }

    _renderHeader(title, expanded) {
        return (
            <View
                style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", backgroundColor: "#ededed" }}
            >
                <Text style={{ fontWeight: "600" }}>
                    {" "}{title}
                </Text>
                {expanded
                    ? <Icon type="Entypo" style={{ fontSize: 13 }} name="chevron-thin-up" />
                    : <Icon type="Entypo" style={{ fontSize: 13 }} name="chevron-thin-down" />}
            </View>
        );
    }

    _renderContent(content) {
        return (<Table dataSource={content} />);
    }

    _reset() {
        Alert.alert(
            'ማስጠንቀቂያ',
            "ሁሉም የተመዘገቡ ምልክች ይጠፋሉ፡፡ ",
            [
                {text: 'ሰርዝ', onPress: () => this._removeAllSymptoms()},
                {text: 'ተው', onPress: () => {}},
            ]
        );
    }

    _removeAllSymptoms() {
        symptoms.map((data) => {
            removeItem(data.key)
        });
        this.setState({
            data:[]
        });
    }

    _retrieveSymptoms() {
        let list = [];
        symptoms.map((data, index) => {
            retrieveItem(data.key).then((item) => {
                if (item !== undefined && item != null) {
                    list.push({
                        'title': data.name,
                        'content': item
                    })
                } else {
                    list.push({
                        'title': data.name,
                        'content' : []
                    })
                }
            }).catch(function (error) {
                console.error(error);
            });
            this.setState({data: list});
        });
    }

    _handleSymptomButton = (index) => {
        Alert.alert(
            'መልእክት',
            symptoms[index].message,
            [
                { text: 'መዝግብ', onPress: () => this._storeSymptom(symptoms[index].key)},
                { text: 'ይቅር' },
            ]
        );
    }

    _storeSymptom(key) {
        const now = moment();
        const dayTime = now.hour() / 12 < 1 ? 'ጠዋት' : 'ምሽት';
        const [y, m, d] = toEthiopian(now.year(), now.month() + 1, now.date());
        let time = `${months[m - 1]} ${d} ፤ ${y} - ${now.format('h:mm')} ${dayTime}`;
        addItemToArray(key, time).then(() => {
            this._retrieveSymptoms();
            Toast.show({
                text: "ስሜቱ ተመዝግቧል፡፡",
                buttonText: "እሽ",
                duration: 3000
            });
        }).catch((error) => {console.log(error)});
    }

    _syptomsListSegment = () => {
        this.setState({seg: 1});
    };

    _recordedSyptomsSegment = () => {
        this.setState({seg: 2});
    };

    render() {

        return (
            <Container style={styles.container}>
                <Header />
                <Segment>
                    <Button
                        first
                        active={this.state.seg === 1 ? true : false}
                        onPress={() => this._syptomsListSegment()}
                    >
                        <Text>ምልክቶች</Text>
                    </Button>
                    <Button
                        last
                        active={this.state.seg === 2 ? true : false}
                        onPress={() => this._recordedSyptomsSegment()}
                    >
                        <Text>የተመዘገቡ</Text>
                    </Button>
                </Segment>
                <Content>
                <ImageJumbotron image={cover}/>
                <Row style={{padding:10}}>
                    <Text>በእርግዝና ጊዜ ሊታዩ የሚችሉ ምልክቶችን ይነግርሻል። ከታች ከተዘረዘሩት ስሜቶች በሚሰማሽ ጊዜ ተጭነሽ ምክንያቱ ምን እንደሆነና ለሃኪምሽም ለማሳየት መመዝገብ ያስችልሻል</Text>
                </Row>
                    {
                        this.state.seg === 1 ?
                            symptoms.map((data, index)=>{
                                return (
                                    <Button key={index} iconLeft block transparent
                                            bordered primary
                                            style={{margin: 10, justifyContent: 'space-around'}}
                                            onPress={() => {this._handleSymptomButton(index)} }
                                    >
                                        <CustomIcon style={{alignSelf:'flex-start', left: 5}} name={data.icon} color="#e82064" size={34}/>
                                        <Text style={{color: "#777", alignSelf:'center'}}>{data.name}</Text>
                                    </Button>
                                )
                            }) :
                            <View>
                                <Accordion
                                    dataArray={this.state.data}
                                    renderHeader={this._renderHeader}
                                    renderContent={this._renderContent}
                                    expanded={0}
                                />

                                <View style={{padding: 10}}>
                                    <Button block rounded danger
                                            onPress={this._reset}>
                                        <Text>ሰርዝ</Text>
                                    </Button>
                                </View>
                            </View>
                    }
                    <Toast
                        ref="toast"
                        position='bottom'/>

                    <Banner />

                </Content>
            </Container>
        );
    }
}

export default Symptoms;
