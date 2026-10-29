#!/usr/bin/env perl
# entropyscope log/text-processing utility.
# Parses telemetry logs and emits structured JSON.
# Deterministic, zero dependencies beyond Perl stdlib.

use strict;
use warnings;
use JSON::PP;
use Getopt::Long;

my $SEED = 7331;

sub parse_line {
    my ($line) = @_;
    chomp $line;
    return {} unless $line =~ /(\S+)\s+(\S+)\s+(.*)/;
    return {
        timestamp => $1,
        level     => $2,
        message   => $3,
        seed      => $SEED,
    };
}

sub main {
    my $input_file = $ARGV[0] // "-";
    my @records;
    if ($input_file eq "-") {
        while (<STDIN>) {
            push @records, parse_line($_);
        }
    } else {
        open(my $fh, "<", $input_file) or die "cannot open $input_file: $!";
        while (<$fh>) {
            push @records, parse_line($_);
        }
        close($fh);
    }
    print encode_json(\@records), "\n";
}

main();
