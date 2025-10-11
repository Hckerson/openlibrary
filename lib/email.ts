function obfuscateEmail(email?: string) {
  if (!email || !email.includes("@")) {
    return "";
  }

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return name[0] + "*****@" + domain;
  }

  return name[0] + "*****" + name.slice(-1) + "@" + domain;
}

export { obfuscateEmail };
