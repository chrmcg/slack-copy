function formatCopiedConversation(raw_text) {
    var lines = raw_text.split('\n');
    var time_regex = /\[(\d)?\d:\d\d( [A,P]M)?\]/;
    var output_lines = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var match_position = line.search(time_regex);
        var line_type;
        if (match_position == -1) {
            if (line.length == 0) {
                line_type = 'EMPTY';
            } else {
                line_type = 'TEXT';
            }
        } else if (match_position == 0) {
            line_type = 'CONTINUE';
        } else {
            line_type = 'START';
        }
        console.log(line, match_position, line_type);

        if (line_type == 'START') {
            var author = line.substring(0, match_position - 1);
            var time = line.substring(match_position, line.indexOf(']', match_position)+1);
            if (output_lines.length > 0) {
                output_lines.push('');
            }
            output_lines.push('**' + author + '** ' + time);
        } else if (line_type == 'TEXT') {
            output_lines.push(line);
        }
    }
    return output_lines.join('\n');
}
