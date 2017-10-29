import { NavigationActions } from 'react-navigation';
import I18n from '../../i18n/i18n';

export function sortInstitutions(institutions) {
  return institutions.sort((a, b) => {
    if (normalizeText(a.name) > normalizeText(b.name)) return 1;
    if (normalizeText(a.name) < normalizeText(b.name)) return -1;
    return 0;
  });
}

export function normalizeText(text) {
  return text
    .replace(/[áàãâä]/gi, 'a')
    .replace(/[éè¨ê]/gi, 'e')
    .replace(/[íìïî]/gi, 'i')
    .replace(/[óòöôõ]/gi, 'o')
    .replace(/[úùüû]/gi, 'u')
    .replace(/[ç]/gi, 'c')
    .replace(/[ñ]/gi, 'n')
    .toLowerCase();
}

export function submit() {
  if (this.state.loading || !validateFields.call(this)) {
    return;
  }

  this.setState({ loading: true, errorMessage: '' });

  const data = {
    email: this.state.email,
    password: this.state.password,
    password_confirmation: this.state.passwordConfirm,
    terms: this.state.termsChecked,
    type: this.state.selectionIndex,
  };

  if (this.state.selectionIndex === 'institution') {
    data.name = this.state.name;
  }

  if (this.state.selectionIndex === 'validator') {
    data.name = this.state.name;
    data.surname = this.state.surname;

    if (this.state.inviteInstitution) {
      data.invite_institution = 'invite';
      data.institution_name = this.state.institutionName;
      data.institution_email = this.state.institutionEmail;
    } else {
      data.institution = this.state.institutionSelected.id;
    }
  }

  this.authenticationApi
    .register(data)
    .then(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login', params: { afterRegister: true } }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    })
    .catch((error) => {
      let errorMessage = '';

      const allowedErrorsKeys = [
        'name',
        'surname',
        'email',
        'password',
        'institution',
        'institution_name',
        'institution_email',
        'terms',
        'type',
      ];

      allowedErrorsKeys.some((errorKey) => {
        if (error[errorKey]) {
          errorMessage = `${error[errorKey][0][0].toUpperCase()}${error[errorKey][0].substring(1)}`;
          return true;
        }
        return false;
      });

      if (errorMessage === '') {
        errorMessage = I18n.t('error-page.an_error_happened');
      }

      this.setState({
        loading: false,
        warningTranslationKey: '',
        errorMessage,
      });
    });
}

function validateFields() {
  if (this.state.selectionIndex === 'none') {
    this.setState({
      errorMessage: I18n.t('reg-profile.user_type_required'),
      warningTranslationKey: '',
    });
    return false;
  }

  if (this.state.password !== this.state.passwordConfirm) {
    this.setState({
      errorMessage: I18n.t('reg-profile.passwords_dont_match'),
      warningTranslationKey: '',
    });
    return false;
  }

  if (!this.state.termsChecked) {
    this.setState({
      errorMessage: I18n.t('reg-profile.terms_required'),
      warningTranslationKey: '',
    });
    return false;
  }

  if (this.state.selectionIndex === 'validator') {
    if (this.state.inviteInstitution) {
      if (!this.state.institutionName || !this.state.institutionEmail) {
        this.setState({
          errorMessage: I18n.t('reg-profile.institution_data_required'),
          warningTranslationKey: '',
        });
        return false;
      }
    } else if (!this.state.institutionSelected.id) {
      this.setState({
        errorMessage: I18n.t('reg-profile.select_institution_required'),
        warningTranslationKey: '',
      });
      return false;
    }
    return true;
  }

  return true;
}
