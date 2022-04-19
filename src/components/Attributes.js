import React, { Component } from 'react'


class Attributes extends Component {
    handleClick(e,parrent_id , id) {
        this.props.setAttribute(e, {
            parrent_id,
            id
        })
    }
    render() {
        const { attributes, selected_attr } = this.props;
        const attributeList = attributes.length ? (
            attributes.map(attribute => {
                return (
                    attribute.type === 'swatch' ? (
                        <div  className={`attr color ${this.props.type}`} key={attribute.id}>
                            <span className="f-bold f-18 attr-name">{attribute.name}:</span>
                            <div className="attr-list">
                                {
                                    attribute.items.map(item => {
                                        return (
                                            <div  className={`attr-item ${selected_attr.find(attr => attr.parrent_id  === attribute.id && attr.id === item.id ) ? "active" : ""}`}
                                                onClick={(e) => this.handleClick(e, attribute.id, item.id)}
                                                style={{ backgroundColor: item.value }} key={item.id}>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    ) : (
                        <div  className={`attr ${this.props.type}`} key={attribute.id}>
                            <span className="f-bold f-18 attr-name">{attribute.name}:</span>
                            <div className="attr-list">
                                {
                                    attribute.items.map(item => {
                                        return (
                                            <div  className={`attr-item ${selected_attr.find(attr => attr.parrent_id  === attribute.id && attr.id === item.id ) ? "active" : ""}`}
                                            onClick={(e) => this.handleClick(e, attribute.id, item.id)}
                                             key={item.id}>
                                                <span>{item.displayValue}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )

                )
            })
        ) : '';
        return (
            <>
                {attributeList}
            </>
        )
    }
}



export default Attributes
