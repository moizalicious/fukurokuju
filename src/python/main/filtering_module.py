
def get_top_entries(list):
    topEntries = []
    for entry in list:
        if entry['score'] != 0:
            topEntries.append(entry)
        else:
            break
    if len(topEntries) > 10:
        temp = topEntries
        topEntries = []
        for i in range(1, 10):
            topEntries.append(temp[i])
    return topEntries
