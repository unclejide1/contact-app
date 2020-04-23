import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    });
  };

  render() {
    let showingContacts;

    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      showingContacts = this.props.contacts.filter((contact) =>
        match.test(contact.name)
      );
    } else {
      showingContacts = this.props.contacts;
    }
    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        <div className="list-contact-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={this.state.query}
            onChange={(e) => this.updateQuery(e.target.value)}
          />
        </div>
        <ol className="contact-list">
          {showingContacts.map((contact, index) => (
            <li key={index} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => this.props.onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
