import { defineRule } from "vee-validate";

export const useValidation = () => {
  const { t } = useI18n();
  defineRule("required", (value: any) => {
    if (!value || !value.length) {
      return t("messages.field_required");
    }
    return true;
  });
  defineRule("maxLength", (value: any, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length > limit) {
      return `${t("messages.max_character")} ${limit}`;
    }
    return true;
  });
  defineRule('minLength', (value: any, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    if (value.length < limit) {
      return t("messages.password_min_length");
    }
    return true;
  });
  defineRule("email", (value: any) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }
    // Check if email
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
      return t("messages.must_valid_email");
    }
    return true;
  });
  defineRule('confirmed', (value: any, [target]) => {
    if (value === target) {
      return true;
    }
    return t("messages.password_must_match");
  });
  const isRequired: any = (value: any) => {
    if (value && value.trim()) {
      return true;
    }
    return t("messages.field_required");
  };

  const isWithinCharactersLimit = (text: string, limit: number) => {
    if (text?.length > limit) {
      return `${t("messages.max_character")} ${limit}`;
    }
  };

  const validateEmail: any = (value: any) => {
    if (!value) {
      return t("messages.field_required");
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
      return t("messages.must_valid_email");
    }
    return true;
  };

  const validatePassword: any = (value: any) => {
    if (!value) {
      return t("messages.field_required");
    } else if (value.length < 8) {
      return t("messages.password_min_length");
    }
    return true;
  };

  const validatePhone: any = (value: any) => {
    if (!value) {
      return t("messages.field_required");
    }
    const phoneNumberRegex =
      /^(?:\+8801|8801|01)[3-9]\d{8}$|^(?:\+1|1)?[-.\s]?\(?[2-9][0-8][0-9]\)?[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$|^[789]\d{9}$/;
    if (!phoneNumberRegex.test(value)) {
      return t("messages.phone_number_not_valid");
    }
    return true;
  };
  return {
    isRequired,
    validateEmail,
    validatePassword,
    validatePhone,
    isWithinCharactersLimit,
    defineRule,
  };
};
