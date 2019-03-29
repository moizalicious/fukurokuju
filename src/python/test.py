ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
alphabet = list(ALPHABET)

word = "this"
rotation = 3
new_word = ""

for letter in list(word):
    if letter in alphabet:
        index = alphabet.index(letter)
        if (index + rotation) <= (len(alphabet) - 1):
            new_word = new_word + alphabet[index + rotation]
        else:
            new_word = new_word + alphabet[(index + rotation) - (len(alphabet) - 1)]
    else:
        new_word = new_word + letter

print(new_word)
