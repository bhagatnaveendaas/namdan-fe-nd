import React, { Component } from "react";
import { Dimensions, Image, View, ActivityIndicator } from "react-native";
import { postJsonData, getData } from "../httpClient/apiRequest";
import { getDiscipleList } from "../constants/routes";
import {
    RecyclerListView,
    DataProvider,
    LayoutProvider,
} from "recyclerlistview";
import { AuthContext } from "../context/AuthContext";
import UserCard from "./entry/components/UserCard";
import FormSelectInput from "../components/FormSelectInput";
import DatePicker from "../components/DatePicker";
import Button from "../components/Button";
import styles from "../styles/Singup";
import moment from "moment";
const calendarIcon = require("../../assets/icons/calenderFilled.png");
import theme from "../constants/theme";

export class UniquePending extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            setEnableSearch: false,
            countries: [],
            states: [],
            districts: [],
            tehsils: [],
            cities: [],
            disciples: [],
            options: [],
            defaultOption: "",
            page: 1,
            stopFetchMore: false,
            fromDate: "",
            toDate: "",
            loading: false,
            country_id: 0,
            state_id: 0,
            district_id: 0,
            tehsil_id: 0,
        };
    }

    layoutProvider = new LayoutProvider(
        (index) => {
            return index;
        },
        (type, dim) => {
            (dim.height = 130), (dim.width = Dimensions.get("window").width);
        }
    );

    setEnableSearch = () => {
        this.setState({
            ...this.state,
            setEnableSearch: !this.state.setEnableSearch,
        });
    };

    getInitialList = async () => {
        this.setState({ ...this.state, loading: true });
        postJsonData(getDiscipleList(1), {
            country_id: this.context.state.user.country,
            search_type: this.state.defaultOption,
            from_date: this.state.fromDate,
            to_date: this.state.toDate,
        })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        ...this.state,
                        dataProvider: this.state.dataProvider.cloneWithRows(
                            data?.data?.disciples
                        ),
                        disciples: data?.data?.disciples,
                        loading: false,
                        stopFetchMore:
                            data?.data.disciples.length === 0 && true,
                        page: 2,
                    });
                }
            })
            .catch((error) => {
                this.setState({ ...this.state, loading: false });
                if (error && error.response) {
                    console.error(error.response.data.error);
                    console.log(error);
                    alert(error.response.data.error);
                } else {
                    console.log("Error: ", error);
                }
            });
    };
    getList = async (page) => {
        this.setState({ ...this.state, loading: true });
        postJsonData(getDiscipleList(page), {
            country_id: this.context.state.user.country,
            search_type: this.state.defaultOption,
            from_date: this.state.fromDate,
            to_date: this.state.toDate,
        })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        ...this.state,
                        dataProvider: this.state.dataProvider.cloneWithRows([
                            ...this.state.disciples,
                            ...data?.data?.disciples,
                        ]),
                        disciples: [
                            ...this.state.disciples,
                            ...data?.data?.disciples,
                        ],
                        loading: false,
                        stopFetchMore:
                            data?.data.disciples.length === 0 && true,
                        page: this.state.page + 1,
                    });
                }
            })
            .catch((error) => {
                this.setState({ ...this.state, loading: false });
                if (error && error.response) {
                    console.error(error.response.data.error);
                    console.log(error);
                    alert(error.response.data.error);
                } else {
                    console.log("Error: ", error);
                }
            });
    };

    getOptions = async () => {
        try {
            const { data } = await getData("/misc/list?slug=search_type");
            if (data.success) {
                const temp = [...data?.data].map((item) => item.name);
                this.setState({
                    ...this.state,
                    options: temp,
                    defaultOption: temp[0],
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    onChange = (key, value) => {
        this.setState({
            ...this.state,
            disciples: [],
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2;
            }),
            page: 1,
            [key]: value,
        });
    };

    componentDidMount() {
        this.getOptions();
    }

    rowRenderer = (type, item) => {
        return (
            <UserCard
                user={item}
                onPress={() =>
                    this.props.navigation.navigate("Profile", {
                        user: item,
                        entryType:
                            this.state.defaultOption === "Satnam Pending"
                                ? "Satnaam Entry"
                                : null,
                    })
                }
            />
        );
    };
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: 15,
                }}
            >
                <FormSelectInput
                    value={this.state.defaultOption}
                    options={this.state.options}
                    onValueChange={(value) =>
                        this.onChange("defaultOption", value)
                    }
                    containerStyle={styles.selectFieldContainer}
                    placeholder="Select Option"
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <DatePicker
                        placeholder="Pick From Date"
                        date={this.state.fromDate}
                        value={moment()}
                        setDate={(date) => this.onChange("fromDate", date)}
                        maximumDate={new Date()}
                        containerStyle={[styles.dateContainer]}
                        wrapperStyle={{ width: "48%" }}
                        appendComponent={
                            <Image
                                source={calendarIcon}
                                style={styles.appendIcon}
                            />
                        }
                    />

                    <DatePicker
                        placeholder="Pick To Date"
                        date={this.state.toDate}
                        value={moment()}
                        setDate={(date) => this.onChange("toDate", date)}
                        maximumDate={new Date()}
                        containerStyle={[styles.dateContainer]}
                        wrapperStyle={{ width: "48%" }}
                        appendComponent={
                            <Image
                                source={calendarIcon}
                                style={styles.appendIcon}
                            />
                        }
                    />
                </View>
                <Button
                    onPress={() => this.getInitialList()}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                    text={"Search"}
                />
                {!this.state.dataProvider._data.length ? null : (
                    <RecyclerListView
                        style={{ marginTop: 10 }}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this.layoutProvider}
                        rowRenderer={this.rowRenderer}
                        showsVerticalScrollIndicator={false}
                        renderFooter={() => {
                            return (
                                this.state.loading && (
                                    <ActivityIndicator
                                        style={{ marginVertical: 10 }}
                                        color={theme.colors.primaryLight}
                                        animating={this.state.loading}
                                        size={"large"}
                                    />
                                )
                            );
                        }}
                        onEndReached={() => {
                            if (!this.state.stopFetchMore) {
                                this.getList(this.state.page);
                            }
                        }}
                        onEndReachedThreshold={0.01}
                    />
                )}
            </View>
        );
    }
}

export default UniquePending;
