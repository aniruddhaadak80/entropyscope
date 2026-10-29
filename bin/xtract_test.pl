#!/usr/bin/env perl
use strict;
use warnings;
use Test::More tests => 2;

my $SEED = 7331;

sub parse_line {
    my ($line) = @_;
    chomp $line;
    return {} unless $line =~ /(\S+)\s+(\S+)\s+(.*)/;
    return { timestamp => $1, level => $2, message => $3, seed => $SEED };
}

my $r = parse_line("2026-10-28 INFO worker-42 reskilled");
is($r->{level}, "INFO");
is($r->{seed}, $SEED);

done_testing();
