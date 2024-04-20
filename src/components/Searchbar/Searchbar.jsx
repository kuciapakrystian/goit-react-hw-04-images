import { Component } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { ToastContainer, toast } from 'react-toastify';
import { Header, Form, Button, Input } from './Searchbar.styled';
import {
  notificationMassege,
  notificationOptions,
} from '../Notification/Notification';

export class Searchbar extends Component {
  state = {
    textQuery: '',
  };
  // стежимо за змінами Input (контрольований елемент)
  onChangeInput = e => {
    this.setState({ textQuery: e.currentTarget.value.trim().toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { textQuery } = this.state;
    const { onSubmit } = this.props;
    // повідомлення
    if (textQuery === '') {
      toast.error(`${notificationMassege}`, notificationOptions);
    }
    //фун-я onSubmit прийшла з App через пропси
    onSubmit(textQuery);

    //очистка рядка пошука
    this.setState({ textQuery: '' });
  };

  render() {
    const { textQuery } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <HiMagnifyingGlass size="24" />
          </Button>

          <Input
            value={textQuery}
            onChange={this.onChangeInput}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
        <ToastContainer />
      </Header>
    );
  }
}