# Most-Frequent-Phrases
React application that finds most frequently used phrases in a string of text

This react application takes a string of any length and returns the top 10 most frequent repeated phrases. A phrase is a stretch of three to ten consecutive words and cannot span sentences. Phrase are omitted if they are a subset of another, longer phrase, even if the shorter phrase occurs more frequently (for example, if “cool and collected” and “calm cool and collected” are repeated, “cool and collected” will not be in the returned set). A phrase is repeated if it is used two or more times.
