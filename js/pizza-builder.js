function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

class PizzaBuilder extends React.Component {
    constructor(...args) {
        super(...args);
        _defineProperty(this, "state", {
            toppingOptions: {
                pepperoni: {
                    title: '意大利辣香腸',
                    icons: ['gluten free'],
                    amount: 12
                },

                bacon: {
                    title: '培根',
                    icons: ['gluten free'],
                    amount: 13
                },

                ham: {
                    title: '火腿',
                    icons: ['gluten free'],
                    amount: 14
                },

                sausage: {
                    title: '香腸',
                    icons: ['gluten free'],
                    amount: 13
                },

                chicken: {
                    title: '雞肉',
                    icons: ['gluten free'],
                    amount: 14
                },

                onions: {
                    title: '洋蔥',
                    icons: ['vegetarian', 'gluten free'],
                    amount: 15
                },

                peppers: {
                    title: '胡椒',
                    icons: ['vegetarian', 'gluten free'],
                    amount: 15
                },

                mushrooms: {
                    title: '蘑菇',
                    icons: ['vegetarian', 'gluten free'],
                    amount: 22
                },

                pineapple: {
                    title: '鳳梨',
                    icons: ['vegetarian', 'gluten free'],
                    amount: 16
                },

                olives: {
                    title: '橄欖',
                    icons: ['vegetarian', 'gluten free'],
                    amount: 19
                },

                jalapenos: {
                    title: '墨西哥辣椒',
                    icons: ['vegetarian', 'gluten free', 'hot'],
                    amount: 19
                }
            },

            selectedToppings: [],
            basePrice: 30000,
            toppingPrice: 4500,
            discount: {
                userCode: '',
                applied: false,
                codes: {
                    henrylee: 25,
                    css: 20,
                    hungry: 30,
                    html: 10,
                    javascript: 15,
                    pizza: 40,
                    react: 35
                }
            },

            orderConfirmed: false
        });
        _defineProperty(this, "confirmOrderBtnRef",

            React.createRef());
        _defineProperty(this, "closeConfirmationBtnRef",
            React.createRef());
        _defineProperty(this, "handleToppingOptionClick",

            e => {
                if (e.target.className === 'topping-input') {

                    const selectedTopping = e.target.id;

                    this.state.selectedToppings.includes(selectedTopping) ?
                        this.setState(prevState => ({
                            selectedToppings: prevState.selectedToppings.filter(topping => topping !== selectedTopping)
                        })) :
                        this.setState(prevState => ({
                            selectedToppings: [...prevState.selectedToppings, selectedTopping]
                        }));
                }
            });
        _defineProperty(this, "handleDiscountInput",
            e => {
                const value = e.target.value.trim().toLowerCase();
                this.setState(prevState => ({
                    discount: {
                        ...prevState.discount,
                        userCode: value
                    }
                }));
                if (this.state.discount.applied) {
                    this.setState(prevState => ({
                        discount: {
                            ...prevState.discount,
                            applied: false
                        }
                    }));
                }
            }
        );
        _defineProperty(this, "handleDiscountClick",

            () => this.setState(prevState => ({
                discount: {
                    ...prevState.discount,
                    applied: true
                }
            }))
        );
        _defineProperty(this, "handleOrderSubmit",

            () => {
                this.setState((prevState) => ({
                        orderConfirmed: !prevState.orderConfirmed
                    }),
                    () => {
                        this.state.orderConfirmed ?
                            this.closeConfirmationBtnRef.current.focus() :
                            this.confirmOrderBtnRef.current.focus();
                    }
                );
            }
        );
    }

    render() {
        return (
            React.createElement(React.Fragment, null,
                React.createElement(Header, null),
                React.createElement("main", null,
                    React.createElement("div", {
                            className: "container"
                        },
                        React.createElement(ToppingSelect, {
                            toppingOptions: Object.entries(this.state.toppingOptions),
                            toppingPrice: (this.state.toppingPrice / 100).toFixed(2),
                            handleToppingOptionClick: this.handleToppingOptionClick
                        }),
                        React.createElement(Pizza, {
                            selectedToppings: this.state.selectedToppings,
                            toppingOptions: this.state.toppingOptions
                        }),
                        React.createElement(OrderDetails, {
                            selectedToppings: this.state.selectedToppings,
                            toppingOptions: this.state.toppingOptions,
                            totalPrice: ((this.state.basePrice + this.state.toppingPrice * this.state.selectedToppings.length) / 100).toFixed(2),
                            discount: this.state.discount,
                            confirmOrderBtnRef: this.confirmOrderBtnRef,
                            handleDiscountInput: this.handleDiscountInput,
                            handleDiscountClick: this.handleDiscountClick,
                            handleOrderSubmit: this.handleOrderSubmit
                        }),

                        this.state.orderConfirmed ?
                        React.createElement(OrderConfirmation, {
                            handleOrderSubmit: this.handleOrderSubmit,
                            closeConfirmationBtnRef: this.closeConfirmationBtnRef
                        }) :
                        null
                    )
                )
            )
        );
    }
}

function Header() {
    return (
        React.createElement("header", null,
            React.createElement("h1", null, React.createElement("span", {
                "aria-hidden": true
            }, "\uD83C\uDF55"), "自製披薩", React.createElement("span", {
                "aria-hidden": true
            }, "\uD83C\uDF55"))
        )
    );
}

function ToppingSelect({
    toppingOptions,
    toppingPrice,
    handleToppingOptionClick
}) {
    return (
        React.createElement("div", {
                className: "topping-select"
            },
            React.createElement("h2", null, "配料"),
            React.createElement("ul", {
                    className: "toppings-info"
                },
                React.createElement("li", null, React.createElement(ToppingIcon, {
                    iconType: 'vegetarian'
                }), " 素食"),
                React.createElement("li", null, React.createElement(ToppingIcon, {
                    iconType: 'gluten free'
                }), " 不含麩質"),
                React.createElement("li", null, React.createElement(ToppingIcon, {
                    iconType: 'hot'
                }), " 辣")
            ),

            React.createElement("p", {
                className: "toppings-info"
            }, "配料每一個收費 ", `$${toppingPrice}`, "。"),
            React.createElement("ul", {
                    className: "topping-options",
                    onClick: handleToppingOptionClick
                },
                toppingOptions.map(topping => React.createElement(ToppingOption, {
                    key: topping[0],
                    topping: topping[0],
                    toppingIcons: topping[1].icons,
                    toppingTitle: topping[1].title
                }))
            )
        )
    );
}

function ToppingOption({
    topping,
    toppingIcons,
    toppingTitle
}) {
    return (
        React.createElement("li", {
                className: "topping-option"
            },
            React.createElement("input", {
                type: "checkbox",
                id: topping,
                className: "topping-input"
            }),
            React.createElement("label", {
                    className: "topping-label",
                    htmlFor: topping,
                    "aria-label": `${topping} (${toppingIcons.map(icon => icon)})`
                },
                React.createElement("div", {
                        className: "topping-image"
                    },
                    React.createElement("div", {
                        className: `${topping} topping-image-item`
                    })
                ),

                React.createElement("span", {
                        className: "topping-label-content"
                    },
                    React.createElement("span", {
                            className: "topping-label-text"
                        },
                        toppingTitle),

                    React.createElement("span", {
                            className: "topping-label-icons"
                        },
                        toppingIcons.map(icon => React.createElement(ToppingIcon, {
                            key: icon,
                            iconType: icon
                        }))
                    )
                )
            )
        )
    );
}

function ToppingIcon({
    iconType
}) {
    return (
        React.createElement("span", {
                className: `topping-icon ${iconType.split(' ')[0]}`,
                "aria-label": iconType
            },
            iconType.charAt(0).toUpperCase()
        )
    );
}

function Pizza({
    toppingOptions,
    selectedToppings
}) {
    return (
        React.createElement("div", {
                className: "pizza-container"
            },
            React.createElement("div", {
                    className: "pizza"
                },
                selectedToppings.map((topping) =>
                    React.createElement(PizzaTopping, {
                        key: topping,
                        topping: topping,
                        toppingAmount: toppingOptions[topping].amount,
                        toppingTitle: toppingOptions[topping].title
                    })
                )
            )
        )
    );
}

function PizzaTopping({
    topping,
    toppingAmount,
    toppingTitle
}) {

    let toppings = [];

    for (let i = 1; i <= toppingAmount; i++) {
        toppings.push(React.createElement("div", {
            key: `${topping + i}`,
            className: `topping ${topping} ${topping}-${i} `,
            title: toppingTitle
        }));
    }

    return toppings;
}

function OrderDetails({
    selectedToppings,
    toppingOptions,
    totalPrice,
    discount,
    confirmOrderBtnRef,
    handleDiscountInput,
    handleDiscountClick,
    handleOrderSubmit
}) {

    const validDiscount = Object.keys(discount.codes).includes(discount.userCode);

    return (
        React.createElement("div", {
                className: "order"
            },
            React.createElement("h2", null, "訂單細節"),
            React.createElement("div", {
                    className: "order-toppings"
                },
                React.createElement("h3", null, "配料："),
                React.createElement("ul", {
                        className: "order-toppings-list"
                    },
                    React.createElement("li", null, "起司"),
                    selectedToppings.map(topping => React.createElement("li", {
                        key: topping
                    }, toppingOptions[topping].title))
                )
            ),

            React.createElement("div", {
                    className: "order-discount"
                },
                React.createElement("h3", null, "優惠碼："),
                React.createElement("input", {
                    type: "text",
                    className: "discount-input",
                    spellCheck: "false",
                    value: discount.userCode,
                    maxLength: "10",
                    onChange: handleDiscountInput,
                    "aria-label": "優惠碼",
                    "aria-describedby": "discount-message",
                    "aria-invalid": discount.applied && !validDiscount
                }),

                discount.applied ?
                validDiscount ?
                React.createElement("p", {
                        id: "discount-message",
                        className: "discount-message discount-message--valid",
                        role: "alert"
                    }, "有效代碼：",
                    discount.codes[discount.userCode], "% Off") :

                React.createElement("p", {
                    id: "discount-message",
                    className: "discount-message discount-message--invalid",
                    role: "alert"
                }, "無效代碼") : null,

                React.createElement("button", {
                    className: "btn discount-btn",
                    onClick: handleDiscountClick,
                    "aria-label": "申請折扣"
                }, "申請")
            ),

            React.createElement("div", {
                    className: "order-price"
                },
                React.createElement("h3", null, "全部金額："),
                React.createElement("p", {
                        className: "price"
                    },

                    `$${discount.applied && validDiscount ?
    (totalPrice - totalPrice * (discount.codes[discount.userCode] / 100)).toFixed(2) : totalPrice}`),

                React.createElement("button", {
                    className: "btn order-btn",
                    onClick: handleOrderSubmit,
                    "aria-label": "確認訂單",
                    ref: confirmOrderBtnRef
                }, "訂購")
            )
        )
    );
}

function OrderConfirmation({
    closeConfirmationBtnRef,
    handleOrderSubmit
}) {
    return (
        React.createElement("div", {
                className: "order-confirmation"
            },
            React.createElement("div", {
                    className: "order-modal"
                },
                React.createElement("h2", null, "訂單已確認"),
                React.createElement("p", null, "您的披薩很快就會送達！"),
                React.createElement("button", {
                    className: "btn close-btn",
                    onClick: handleOrderSubmit,
                    "aria-label": "關閉確認",
                    ref: closeConfirmationBtnRef
                }, "關閉")
            )
        )
    );
}

ReactDOM.render(React.createElement(PizzaBuilder, null), document.querySelector('#root'));