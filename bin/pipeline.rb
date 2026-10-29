#!/usr/bin/env ruby
# entropyscope content pipeline — documentation and dataset munging CLI.
# Deterministic, offline, zero dependencies beyond Ruby stdlib.

require "json"
require "fileutils"

SEED = 7331

def log(msg)
  $stderr.puts "[pipeline] #{msg}"
end

def generate_readme_stats
  log("generating README stats...")
  {
    seed: SEED,
    generated_at: Time.now.utc.iso8601,
  }
end

def main
  stats = generate_readme_stats
  puts JSON.pretty_generate(stats)
end

main if __FILE__ == $PROGRAM_NAME
